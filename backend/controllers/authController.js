const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sheets = require("../services/googleSheets");
const { SPREADSHEET_ID } = require("../config/constants");
const SECRET = process.env.JWT_SECRET;

const SHEET_NAME = "Users";

async function getUsers() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}`,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    return { users: [], headers: [] };
  }

  const headers = rows[0];
  const users = rows.slice(1).map(row => {
    const user = {};
    headers.forEach((h, i) => {
      user[h] = row[i] || "";
    });
    return user;
  });

  return { users, headers };
}

exports.signup = async (req, res) => {
  const { email, password, role = "user" } = req.body;
  const { users, headers } = await getUsers();

  if (users.find(u => u.email === email)) {
    return res.status(400).send("User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const requiredHeaders = ["email", "password", "role"];
  const syncedHeaders = [...headers];

  // Add missing required headers
  for (const h of requiredHeaders) {
    if (!syncedHeaders.includes(h)) syncedHeaders.push(h);
  }

  // Update headers if needed
  if (JSON.stringify(headers) !== JSON.stringify(syncedHeaders)) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      resource: { values: [syncedHeaders] },
    });
  }

  // Create new row with all headers
  const newRow = syncedHeaders.map(h => {
    if (h === "email") return email;
    if (h === "password") return hashedPassword;
    if (h === "role") return role;
    return "";
  });

  // Append new user
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_NAME,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: { values: [newRow] },
  });

  res.send("Signup successful!");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const { users } = await getUsers();
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign({ email: user.email, role: user.role }, SECRET, {
    expiresIn: "1d",
  });

  // Set HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // Return success response
  res.json({ 
    success: true, 
    role: user.role,
    message: "Login successful"
  });
};

exports.logout = (req, res) => {
  // Clear token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  
  res.json({ success: true, message: "Logged out successfully" });
};

exports.changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  const { users, headers } = await getUsers();
  
  // Validate user exists
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).send("User not found.");

  // Verify current password
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) return res.status(401).send("Current password is incorrect.");

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Find user row (add 2: 1 for header row, 1 for 1-based indexing)
  const rowIndex = users.findIndex(u => u.email === email) + 2;
  
  // Find password column index
  const passwordColIndex = headers.indexOf("password");
  if (passwordColIndex === -1) return res.status(500).send("Password column not found.");

  // Convert index to column letter (A=0, B=1, etc.)
  const columnLetter = String.fromCharCode(65 + passwordColIndex);
  
  // Create range (e.g., "Users!B5")
  const range = `${SHEET_NAME}!${columnLetter}${rowIndex}`;
  
  // Update password in sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: "RAW",
    resource: { values: [[hashedPassword]] },
  });

  res.send("Password updated successfully.");
};