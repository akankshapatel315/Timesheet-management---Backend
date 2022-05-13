const Timesheet = require("../models/timesheet");

exports.insert =
  ("/insert",
  (req, res) => {
    let { name, inTime, outTime, title } = req.body;
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    const startDate = year + "-" + month + "-" + date;

    Timesheet.findOne({ start: startDate, name: name }, (err, timesheet) => {
      console.log(timesheet);
      if (timesheet) {
        res
          .status(409)
          .send({ message: " For This Date you have already sheet inserted" });
      } else {
        const timesheet = new Timesheet({
          name,
          start: startDate,
          inTime,
          outTime,
          end: startDate,
          totalHour: title,
        });
        timesheet.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Successfully inserted" });
          }
        });
      }
    });
  });

exports.delete =
  ("/delete/:start",
  (req, res) => {
    console.log(req.params.start);
    // res.send("This is Called");
    Timesheet.deleteOne({ start: req.params.start })
      .then(() => {
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

exports.Details =
  ("/Details/:page",
  (req, res) => {
    let currentPage = req.params.page * 5;

    Timesheet.find((err, timesheet) => {
      if (timesheet) {
        res.status(200).send(timesheet);
      } else {
        res.status(400).send({ isExist: false });
      }
    })
      .limit(5)
      .skip(currentPage);
  });

exports.AllDetails =
  ("/AllDetails",
  (req, res) => {
    Timesheet.find((err, timesheet) => {
      if (timesheet) {
        res.status(200).send(timesheet);
        console.log(timesheet);
      } else {
        res.status(400).send({ isExist: false });
      }
    });
  });

exports.totalRecordCount =
  ("/totalrecordcount",
  (req, res) => {
    Timesheet.find((err, timesheet) => {
      if (timesheet) {
        res.status(200).send(timesheet);
        // console.log(timesheet);
      } else {
        res.status(400).send({ isExist: false });
      }
    });
  });

exports.searchDetail =
  ("/searchDetail/:username",
  (req, res) => {
    let name = req.params.username;
    console.log(name);
    Timesheet.find({ name }, (err, timesheet) => {
      if (timesheet) {
        res.status(200).send(timesheet);
      } else {
        res.status(400).send({ isExist: false });
      }
    });
  });

exports.searchDetail =
  ("/loadDetail/:username",
  (req, res) => {
    let name = req.params.username;
    Timesheet.find({ name }, (err, timesheet) => {
      if (timesheet) {
        res.status(200).send(timesheet);
      } else {
        res.status(400).send({ isExist: false });
      }
    });
  });

exports.filterDetail =
  ("/filterDetail/",
  (req, res) => {
    let name = req.query.name;
    let start = req.query.start;
    let end = req.query.end;

    Timesheet.find(
      {
        name,
        $and: [{ start: { $gte: start } }, { start: { $lte: end } }],
      },
      (err, timesheet) => {
        if (timesheet) {
          console.log(timesheet);
          res.status(200).send(timesheet);
        } else {
          res.status(404).send(err);
        }
      }
    );
  });

exports.updateDetail =
  ("/updateDetail",
  (req, res) => {
    console.log(req.body);
    Timesheet.find({ start: req.body.start }, (err, sheet) => {
      const record = {
        _id: req.body._id,
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        inTime: req.body.inTime,
        outTime: req.body.outTime,
        totalHour: req.body.title,
      };
      console.log(record);
      // var startdate = new Date(req.body.start);
      // if (sheet.length == 0 || sheet[0].start.toString() == startdate) {
      Timesheet.findByIdAndUpdate(req.body._id, record, (err, timesheet) => {
        console.log(err);
        console.log(timesheet);
        if (timesheet) {
          res.status(200).send(timesheet);
        } else {
          res.status(400).send(err);
        }
      });
      // } else {
      //   res.status(209).send("Already Exists");
      // }
    });
  });
