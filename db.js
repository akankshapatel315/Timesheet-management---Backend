const mongoose = require("mongoose");
const DB = mongoose.connect(
  "mongodb://localhost:27017/timesheetDB",
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  },
  () => {
    console.log("DB connected");
  }
);

module.exports = DB;
