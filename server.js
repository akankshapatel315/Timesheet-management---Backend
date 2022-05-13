const express = require("express");
const cors = require("cors");
const DB = require("./db");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


const userRouter = require("./routes/users");
app.use("/users", userRouter);

const timesheetRouter = require("./routes/timesheet");
app.use("/timesheet", timesheetRouter);

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
