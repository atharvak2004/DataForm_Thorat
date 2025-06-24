const sheets = require("../services/googleSheets");
const { SPREADSHEET_ID } = require("../config/constants");

module.exports = async (req, res, next) => {
  const { reportId } = req.params;
  const userEmail = req.user.email;

  try {
    const statusRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "ReportsStatus",
    });

    const rows = statusRes.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No reports found" });
    }
    
    const headers = rows[0];
    const idIndex = headers.indexOf("reportID");
    const emailIndex = headers.indexOf("userEmail");
    const paymentIndex = headers.indexOf("paymentStatus");
    const stageIndex = headers.indexOf("currentStage");
    
    if (idIndex === -1 || emailIndex === -1 || paymentIndex === -1 || stageIndex === -1) {
      return res.status(500).json({ error: "Required columns missing in ReportsStatus" });
    }

    const report = rows.find(row => 
      row[idIndex] === reportId && 
      row[emailIndex] === userEmail
    );

    if (!report) {
      return res.status(404).json({ error: "Report not found for this user" });
    }

    const paymentStatus = report[paymentIndex];
    const currentStage = report[stageIndex];

    // Allow access only if payment completed (stages 5-6)
    if (paymentStatus !== "completed" || currentStage < 5) {
      return res.status(403).json({ error: "Payment required to view this report" });
    }

    next();
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ error: "Payment verification failed" });
  }
};