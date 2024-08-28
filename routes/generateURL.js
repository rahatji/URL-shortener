// external imports
const express = require("express");

//internal imports
const shortID = require("../controller/shortID");
const { urlValidationRules, validateUrl } = require("../vallidator/inputVallidator");

const router = express.Router();

router.get("/", (req,res)=> {
    res.render("index");
});

router.post( "/",urlValidationRules,validateUrl, shortID);


module.exports = router;