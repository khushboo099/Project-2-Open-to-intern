const CollegeModel = require("../Models/CollegeModel");
const internModel = require("../Models/InternModel");

const intern = async function (req, res) {
  try {
    let body = req.body;

    if (!body.name) {
      return res.status(400).send({ status: false, msg: "Provide name" });
    }

    if (!body.email) {
      return res.status(400).send({ status: false, msg: "Provide email" });
    }

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(body.email)) {
      return res
        .status(401)
        .send({ status: false, msg: "Please enter a valid Email" });
    }

    let checkEmail = await internModel.find({ email: body.email });
    if (checkEmail.length != 0) {
      return res
        .status(409)
        .send({ status: false, msg: "This email already exists" });
    }

    if (!body.mobile) {
      return res.status(400).send({ status: false, msg: "Provide mobile" });
    }

    if (!/^([+]\d{2})?\d{10}$/.test(body.mobile)) {
      return res
        .status(401)
        .send({ status: false, msg: "Please enter a valid Mobile" });
    }

    let checkMobile = await internModel.find({ mobile: body.mobile });
    if (checkMobile.length != 0) {
      return res
        .status(409)
        .send({ status: false, msg: "This Mobile already exists" });
    }
// console.log(body.collegeName)
    if (!body.collegeName) {
      return res.status(400).send({ status: false, msg: "Provide College name" });
    }
    let collegeData = await CollegeModel.find({name:body.collegeName}).select({_id:true})
    // console.log(collegeData[0])
    if (collegeData.length == 0 ){
        return res.status(404).send({status:false, msg:"Requested college doesn't exist."})
    }
    
    let internData = await internModel.create({name:body.name, email:body.email, mobile:body.mobile, collegeId:collegeData[0]});
    let name = internData.name;
    let email = internData.email;
    let mobile = internData.mobile;
    let collegeId = internData.collegeId;
    let isDeleted = internData.isDeleted
    res.status(201).send({isDeleted,name,email,mobile, collegeId});
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports.intern = intern;
