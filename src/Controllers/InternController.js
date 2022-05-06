const CollegeModel = require("../Models/CollegeModel");
const internModel = require("../Models/InternModel");

const intern = async function (req, res) {
  try {
    let body = req.body;

    let data = await internModel.find(body)
    if (data.length != 0){
      return res.status(409).send({status:false, message: "Provided data already exist."})
    }

    if (!body.name) {
      return res.status(400).send({ status: false, msg: "Provide name" });
    }

    if (!/^(\w+)( )(\w+)*(( )(\w+))?$/.test(body.name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid name." });
    }


    if (!body.email) {
      return res.status(400).send({ status: false, msg: "Provide email" });
    }

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(body.email)) {
      return res
        .status(400)
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

    if (!/^([+91])?\d{10}$/.test(body.mobile)) {
      return res
        .status(400)
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
    let collegeId = internData.collegeId._id;
    let isDeleted = internData.isDeleted;

   let allData = {isDeleted, name, email, mobile, collegeId}

    res.status(201).send({status:true, data:allData});
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports.intern = intern;
