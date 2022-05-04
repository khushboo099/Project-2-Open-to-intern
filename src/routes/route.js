const express = require("express");
const router = express.Router();
const collegeController = require("../Controllers/CollegeController");
const internController = require("../Controllers/InternController");

router.post("/functionup/colleges", collegeController.college);

router.post("/functionup/interns", internController.intern);

router.get("/functionup/collegeDetails", collegeController.getCollegeDetails);

module.exports = router;
