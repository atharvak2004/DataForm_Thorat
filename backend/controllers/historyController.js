const sheets = require("../services/googleSheets");
const { SPREADSHEET_ID } = require("../config/constants");

exports.getLatestReports = async (req, res) => {
  try {
    const sheetNames = ["Sheet1", "Sheet2", "Sheet3", "Sheet4", "Sheet5"];
    let allReports = [];

    for (const sheet of sheetNames) {
      const result = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheet}`,
      });

      const rows = result.data.values;
      if (!rows || rows.length < 2) continue;

      const headers = rows[0];
      const lastUpdatedIndex = headers.indexOf("lastUpdated");
      if (lastUpdatedIndex === -1) continue;

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const report = {};
        headers.forEach((key, j) => {
          report[key] = row[j] || "";
        });
        if (sheet === "Sheet2") {
          report.vehicleNo = report.registrationNo || "-";
        }
        if (report.lastUpdated) {
          report.sheet = sheet;
          allReports.push(report);
        }
      }
    }

    const sortedReports = allReports
      .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
      .slice(0, 25);

    res.json(sortedReports);
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).send("Failed to load report history");
  }
};
