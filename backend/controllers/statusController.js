const sheets = require("../services/googleSheets");
const { SPREADSHEET_ID } = require("../config/constants");

const STAGES = {
  1: "Information Given",
  2: "Working",
  3: "Completed (Payment Done, Submitted)"
};

const STAGE_COLORS = {
  1: "#FFFF00", // Amber
  2: "#007BFF", // Blue
  3: "#28A745"  // Green
};

// Initialize ReportsStatus sheet
exports.initializeStatusSheet = async () => {
  try {
    // Check if sheet exists
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
      fields: "sheets.properties.title"
    });
    
    const sheetTitles = spreadsheet.data.sheets.map(
      sheet => sheet.properties.title
    );
    
    if (!sheetTitles.includes("ReportsStatus")) {
      // Create new sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        resource: {
          requests: [{
            addSheet: {
              properties: {
                title: "ReportsStatus"
              }
            }
          }]
        }
      });
    }
    
    // Set headers
    const headers = [
      "reportID", "vehicleNo", "reportType", "currentStage", 
      "paymentStatus", "assignedTo", "userEmail", "lastUpdated"
    ];
    
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: "ReportsStatus!A1",
      valueInputOption: "RAW",
      resource: { values: [headers] }
    });
    
    console.log("ReportsStatus sheet initialized");
  } catch (err) {
    console.error("Error initializing ReportsStatus sheet:", err);
  }
};

// Create new report status
exports.createStatus = async (reportId, vehicleNo, reportType, userEmail) => {
  const newStatus = {
    reportId,
    vehicleNo,
    reportType,
    currentStage: 1,
    paymentStatus: "pending",
    assignedTo: "",
    userEmail,
    lastUpdated: new Date().toISOString()
  };
  
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "ReportsStatus",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: { values: [Object.values(newStatus)] }
  });
  
  return newStatus;
};

// Update report status
exports.updateStatus = async (req, res) => {
  const { reportId } = req.params;
  const { stage, paymentStatus, assignedTo } = req.body;

  try {
    // Get existing status
    const statusRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "ReportsStatus",
    });
    
    const rows = statusRes.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).send("No reports found");
    }
    
    const headers = rows[0];
    const reportIndex = rows.findIndex(row => row[0] === reportId);
    
    if (reportIndex === -1) {
      return res.status(404).send("Report not found");
    }
    
    // Prepare update
    const updatedRow = [...rows[reportIndex]];
    if (stage !== undefined) {
      updatedRow[headers.indexOf("currentStage")] = stage;
    }
    if (paymentStatus) updatedRow[headers.indexOf("paymentStatus")] = paymentStatus;
    if (assignedTo) updatedRow[headers.indexOf("assignedTo")] = assignedTo;
    
    updatedRow[headers.indexOf("lastUpdated")] = new Date().toISOString();
    
    // Update in sheets
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `ReportsStatus!A${reportIndex + 1}`,
      valueInputOption: "RAW",
      resource: { values: [updatedRow] }
    });
    
    res.json({ 
      success: true,
      stage: STAGES[stage] || STAGES[updatedRow[headers.indexOf("currentStage")]],
      color: STAGE_COLORS[stage] || STAGE_COLORS[updatedRow[headers.indexOf("currentStage")]]
    });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).send("Status update failed");
  }
};

// Get all reports for admin dashboard
exports.getAllReports = async (req, res) => {
  try {
    const statusRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "ReportsStatus",
    });
    
    const rows = statusRes.data.values;
    if (!rows || rows.length === 0) return res.json([]);
    
    const headers = rows[0];
    const reports = rows.slice(1).map(row => {
      const report = {};
      headers.forEach((header, i) => {
        report[header] = row[i] || "";
      });
      report.stageText = STAGES[report.currentStage] || "Unknown";
      report.color = STAGE_COLORS[report.currentStage] || "#000000";
      return report;
    });
    
    res.json(reports);
  } catch (err) {
    console.error("Fetch reports error:", err);
    res.status(500).send("Failed to load reports");
  }
};

// Get user's reports
exports.getUserReports = async (req, res) => {
  try {
    const userEmail = req.user.email;
    
    const statusRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "ReportsStatus",
    });
    
    const rows = statusRes.data.values;
    if (!rows || rows.length === 0) return res.json([]);
    
    const headers = rows[0];
    const emailIndex = headers.indexOf("userEmail");
    
    if (emailIndex === -1) {
      return res.status(500).send("userEmail column not found");
    }
    
    const userReports = rows.slice(1)
      .filter(row => row[emailIndex] === userEmail)
      .map(row => {
        const report = {};
        headers.forEach((header, i) => {
          report[header] = row[i] || "";
        });
        report.stageText = STAGES[report.currentStage] || "Unknown";
        report.color = STAGE_COLORS[report.currentStage] || "#000000";
        return report;
      });
    
    res.json(userReports);
  } catch (err) {
    console.error("Fetch user reports error:", err);
    res.status(500).send("Failed to load user reports");
  }
};