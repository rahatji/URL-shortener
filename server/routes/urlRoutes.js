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
    app.post("/api/shorten/create-url", auth, createUrl);
    app.get("/api/shorten/urls", auth, fetchUrls);
    
    app.patch("/api/shorten/:shortId", auth, customizeUrl);
    app.delete("/api/delete-urls", auth, deleteMultipleUrls)


module.exports = router;