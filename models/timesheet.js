const mongoose = require("mongoose");
const timesheetSchema = new mongoose.Schema({
  name: String,
  start: Date,
  inTime: String,
  outTime: String,
  end: Date,
  totalHour: String,
});

module.exports = mongoose.model("Timesheet", timesheetSchema);
