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
  const headers = rows[0];
  const users = rows.slice(1).map(row => {
    const user = {};
    headers.forEach((h, i) => {
      user[h] = row[i];
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

  for (const h of requiredHeaders) {
    if (!syncedHeaders.includes(h)) syncedHeaders.push(h);
  }

  if (JSON.stringify(headers) !== JSON.stringify(syncedHeaders)) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      resource: { values: [syncedHeaders] },
    });
  }

  const newRow = syncedHeaders.map(h => {
    if (h === "email") return email;
    if (h === "password") return hashedPassword;
    if (h === "role") return role;
    return "";
  });

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

  res.json({ token });
};
exports.changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  const { users, headers } = await getUsers();
  const user = users.find(u => u.email === email);

  if (!user) return res.status(404).send("User not found.");

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) return res.status(401).send("Current password is incorrect.");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const rowIndex = users.findIndex(u => u.email === email) + 2; 
  const passwordColIndex = headers.indexOf("password");

  if (passwordColIndex === -1) return res.status(500).send("Password column not found.");

  const range = `${SHEET_NAME}!${String.fromCharCode(65 + passwordColIndex)}${rowIndex}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: "RAW",
    resource: { values: [[hashedPassword]] },
  });

  res.send("Password updated successfully.");
};
