const express = require("express");
const router = express.Router();

const timesheetController = require("../controller/timesheetcontroller");
router.post("/insert", timesheetController.insert);
router.delete("/delete/:start", timesheetController.delete);
router.get("/Details/:page", timesheetController.Details);
router.get("/AllDetails/", timesheetController.AllDetails);
router.get("/searchDetail/:username", timesheetController.searchDetail);
router.get("/filterDetail/", timesheetController.filterDetail);
router.get("/totalrecordcount", timesheetController.totalRecordCount);
router.put("/updateDetail", timesheetController.updateDetail);

module.exports = router;
