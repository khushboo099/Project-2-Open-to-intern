const express = require('express')
const CollegeModel = require('../Models/CollegeModel')
const InternModel = require('../Models/InternModel')

const college = async function (req, res) {
    try {
        let body = req.body
        if (!body.name) {
            return res.status(400).send({ status: false, msg: "Provide name" })
        }

        if (body.name.length == 0 || Object.keys(body.name).length == 0) {
            return res.status(400).send({ status: false, msg: "Provide valid name" })
        }

        if (!body.fullName) {
            return res.status(400).send({ status: false, msg: "Provide fullName" })
        }

        if (body.fullName.length == 0 || Object.keys(body.fullName).length == 0) {
            return res.status(400).send({ status: false, msg: "Provide valid fullName" })
        }

        if (!body.logoLink) {
            return res.status(400).send({ status: false, msg: "Provide logoLink" })
        }

        if (body.logoLink.length == 0 || Object.keys(body.logoLink).length == 0) {
            return res.status(400).send({ status: false, msg: "Provide valid logoLink" })
        }

        if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

            .test(body.logoLink)) {
            return res.status(401).send({ status: false, msg: "Please enter a valid logoLink" });
        }

        let collegeData = await CollegeModel.create(body)
        res.send({ status: true, data: collegeData })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message });
    }
}

const getCollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.name
        
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "Provide CollegeName" })
        }
        let collegeData = await CollegeModel.find({ name: collegeName })
        
        if (collegeData.length == 0) {
            return res.status(404).send({ status: false, msg: "College Name not Found" })
        }

        let internData = await InternModel.findById(collegeData._id).select({_id:true, name:true, email:true, mobile:true})
        console.log(internData)
        if (Object.keys(internData).length == 0) {
            return res.status(404).send({ status: false, msg: "Interns Details not Found" })
        }
        let collegeDetails = {name:collegeData.name, fullName:collegeData.fullName, logoLink:collegeData.logoLink, interests:internData}
        res.send({ status: true, data: collegeDetails })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message });
    }
}

module.exports.college = college
module.exports.getCollegeDetails = getCollegeDetails