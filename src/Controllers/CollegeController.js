const CollegeModel = require("../Models/CollegeModel");
const InternModel = require("../Models/InternModel");

const college = async function (req, res) {
  try {
    let body = req.body;
    if (!body.name) {
      return res.status(400).send({ status: false, msg: "Provide name" });
    }

    if (body.name.length == 0 || Object.keys(body.name).length == 0) {
      return res.status(400).send({ status: false, msg: "Provide valid name" });
    }

    if (!body.fullName) {
      return res.status(400).send({ status: false, msg: "Provide fullName" });
    }

    if (body.fullName.length == 0 || Object.keys(body.fullName).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Provide valid fullName" });
    }

    if (!body.logoLink) {
      return res.status(400).send({ status: false, msg: "Provide logoLink" });
    }

    if (body.logoLink.length == 0 || Object.keys(body.logoLink).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Provide valid logoLink" });
    }

    if (
      !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
        body.logoLink
      )
    ) {
      return res
        .status(401)
        .send({ status: false, msg: "Please enter a valid logoLink" });
    }

    let collegeData = await CollegeModel.create(body);
    res.status(201).send({ status: true, data: collegeData });
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};

const getCollegeDetails = async function (req, res) {
  try {
    const data = req.query.collegeName;
    const details = await CollegeModel.findOne({
      name: data,
      isDeleted: false,
    });
    //   console.log(details)
    if (!details) {
      return res
        .status(400)
        .send({ status: false, message: "Details  is not present " });
    }

    const internData = await InternModel.find({
      collegeId: details._id,
      isDeleted: false,
    }).select({ name: true, email: true, mobile: true });
    //   console.log(internData)
    if (!internData) {
      return res
        .status(400)
        .send({ status: false, massege: "Data not present" });
    }
    const getData = {
      name: details.name,
      fullName: details.fullName,
      logoLink: details.logoLink,
      interests: internData,
    };

    return res.status(200).send({ status: true, data: getData });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports.college = college;
module.exports.getCollegeDetails = getCollegeDetails;
