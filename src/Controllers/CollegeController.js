const CollegeModel = require("../Models/CollegeModel");
const InternModel = require("../Models/InternModel");

const college = async function (req, res) {
  try {
    let body = req.body;
    if (!body.name) {
      return res.status(400).send({ status: false, message: "Provide name" });
    }

    if (!/^([a-zA-Z]+)$/.test(body.name)) {
      return res
        .status(401)
        .send({ status: false, msg: "Please enter a valid name" });
    }
    if (!body.fullName) {
      return res.status(400).send({ status: false, message: "Provide fullName" });
    }

    if (body.fullName.length == 0 || Object.keys(body.fullName).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Provide valid fullName" });
    }

  

    if (!body.logoLink) {
      return res.status(400).send({ status: false, message: "Provide logoLink" });
    }

    if (
      !/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/.test(
        body.logoLink
      )
    ) {
      return res
        .status(401)
        .send({ status: false, message: "Please enter a valid logoLink" });
    }

    let data = await CollegeModel.find(body)
    if (data.length!=0){
       return res.status(400).send({status:false, message:"Data already exist."})
    }

    let collegeData = await CollegeModel.create(body) 
    let name = collegeData.name;
    let fullName = collegeData.fullName;
    let logoLink = collegeData.logoLink;
    let isDeleted = collegeData.isDeleted;
    let allData = {isDeleted,name,fullName,logoLink}
    res.status(201).send({status:true,data:allData});
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
