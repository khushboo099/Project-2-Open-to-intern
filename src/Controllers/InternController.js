const express = require('express')
const internModel = require('../Models/InternModel')

const intern = async function (req, res) {
    try {
        let body = req.body

        if (!body.name) {
            return res.status(400).send({ status: false, msg: "Provide name" })
        }

        if (!body.email) {
            return res.status(400).send({ status: false, msg: "Provide email" })
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(body.email)) {
            return res.status(401).send({ status: false, msg: "Please enter a valid Email" });
        }

        let checkEmail = await internModel.find({ email: body.email })
        if (checkEmail.length != 0) {
            return res.status(409).send({ status: false, msg: "This email already exists" })
        }

        if (!body.mobile) {
            return res.status(400).send({ status: false, msg: "Provide mobile" })
        }

        if (!/^([+]\d{2})?\d{10}$/.test(body.mobile)) {
            return res.status(401).send({ status: false, msg: "Please enter a valid Mobile" });
        }

        let checkMobile = await internModel.find({ mobile: body.mobile })
        if (checkMobile.length != 0) {
            return res.status(409).send({ status: false, msg: "This Mobile already exists" })
        }

        if (!collegeId) {
            return res.status(400).send({ status: false, msg: "Provide CollegeId" })
        }

        let internData = await internModel.create(body)
        res.send({ status: true, data: internData })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message });
    }
}


module.exports.intern = intern