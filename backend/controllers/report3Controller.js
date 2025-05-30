const sheets = require("../services/googleSheets");
const { SPREADSHEET_ID } = require("../config/constants");

// 🔍 Find report in Sheet3 by vehicleNo
exports.find = async (req, res) => {
  const targetVehicleNo = req.params.vehicleNo.toLowerCase();

  try {
    const allRows = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet3',
    });

    const rows = allRows.data.values;
    const headers = rows[0];
    const vehicleNoIndex = headers.indexOf("vehicleNo");

    if (vehicleNoIndex === -1) {
      return res.status(404).send("vehicleNo column not found.");
    }

    const foundIndex = rows.findIndex((row, i) => {
      if (i === 0) return false;
      return row[vehicleNoIndex]?.toLowerCase() === targetVehicleNo;
    });

    if (foundIndex === -1) {
      return res.status(404).send("Vehicle not found.");
    }

    const row = rows[foundIndex];
    const rowData = {};
    headers.forEach((key, i) => {
      rowData[key] = row[i] || "";
    });

    res.json({ rowIndex: foundIndex, rowData });
  } catch (err) {
    console.error('Error finding vehicleNo:', err);
    res.status(500).send("Internal server error.");
  }
};

// 📝 Create new report (append) in Sheet3
exports.create = async (req, res) => {
  const formData = req.body.rawFormData;
  formData.lastUpdated = new Date().toISOString();

  try {
    const sheetRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet3!1:1',
    });

    const existingHeaders = sheetRes.data.values?.[0] || [];
    let headers = [...existingHeaders];

    // Ensure lastUpdated is present
    if (!headers.includes("lastUpdated")) {
      headers.push("lastUpdated");

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet3!A1',
        valueInputOption: 'RAW',
        resource: { values: [headers] },
      });
    }

    const alignedValues = headers.map(h => formData[h] || "");

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet3',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: { values: [alignedValues] },
    });

    res.send("Report3 data saved with synced headers.");
  } catch (err) {
    console.error('POST /report3 error:', err);
    res.status(500).send("Failed to save report3 data.");
  }
};

// 🔁 Update existing report row in Sheet3
exports.update = async (req, res) => {
  const { rowIndex } = req.params;
  const formData = req.body.rawFormData;
  formData.lastUpdated = new Date().toISOString();

  try {
    const sheetRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet3!1:1',
    });

    let headers = sheetRes.data.values?.[0] || [];

    if (!headers.includes("lastUpdated")) {
      headers.push("lastUpdated");

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet3!A1',
        valueInputOption: 'RAW',
        resource: { values: [headers] },
      });
    }

    const alignedValues = headers.map(h => formData[h] || "");

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `Sheet3!A${parseInt(rowIndex) + 1}`,
      valueInputOption: 'RAW',
      resource: { values: [alignedValues] },
    });

    res.send("Data updated successfully.");
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).send("Failed to update row.");
  }
};
