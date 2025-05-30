require('dotenv').config();

module.exports = {
  SPREADSHEET_ID: process.env.SPREADSHEET_ID,
  SECRET: process.env.JWT_SECRET,
};
