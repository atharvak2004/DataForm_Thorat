const sheets = require("../services/googleSheets");
const { SPREADSHEET_ID } = require("../config/constants");

// 🔍 Find by registrationNo
exports.find = async (req, res) => {
  const targetRegistrationNo = req.params.registrationNo.toLowerCase();

  try {
    const allRows = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet2',
    });

    const rows = allRows.data.values;
    const headers = rows[0];
    const registrationNoIndex = headers.indexOf("registrationNo");

    if (registrationNoIndex === -1) {
      return res.status(404).send("registrationNo column not found.");
    }

    const foundIndex = rows.findIndex((row, i) => {
      if (i === 0) return false;
      return row[registrationNoIndex]?.toLowerCase() === targetRegistrationNo;
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
    console.error('Error finding registrationNo:', err);
    res.status(500).send("Internal server error.");
  }
};

// 📝 Create new report in Sheet2
exports.create = async (req, res) => {
  const formData = req.body.rawFormData;
  formData.lastUpdated = new Date().toISOString();

  try {
    const sheetRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet2!1:1',
    });

    const existingHeaders = sheetRes.data.values?.[0] || [];
    let headers = [...existingHeaders];

    if (!headers.includes("lastUpdated")) {
      headers.push("lastUpdated");

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet2!A1',
        valueInputOption: 'RAW',
        resource: { values: [headers] },
      });
    }

    const alignedValues = headers.map(h => formData[h] || "");

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet2',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: { values: [alignedValues] },
    });

    res.send('Report2 data saved with synced headers.');
  } catch (err) {
    console.error('POST /report2 error:', err);
    res.status(500).send('Failed to save report2 data.');
  }
};

// 🔁 Update existing report row
exports.update = async (req, res) => {
  const { rowIndex } = req.params;
  const formData = req.body.rawFormData;
  formData.lastUpdated = new Date().toISOString();

  try {
    const sheetRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet2!1:1',
    });

    let headers = sheetRes.data.values?.[0] || [];

    if (!headers.includes("lastUpdated")) {
      headers.push("lastUpdated");

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet2!A1',
        valueInputOption: 'RAW',
        resource: { values: [headers] },
      });
    }

    const alignedValues = headers.map(h => formData[h] || "");

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `Sheet2!A${parseInt(rowIndex) + 1}`,
      valueInputOption: 'RAW',
      resource: { values: [alignedValues] },
    });

    res.send("Data updated successfully.");
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).send("Failed to update row.");
  }
};
