const { google } = require("googleapis");
const fs = require("fs");

const keys = JSON.parse(fs.readFileSync("/etc/secrets/service-account.json", "utf8"));

const auth = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const sheets = google.sheets({ version: "v4", auth });

module.exports = sheets;
