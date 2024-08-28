// external imports
const express = require("express");
const getURL = require ("../controller/redirectHandler");

const router = express.Router();

router.get("/:shortID",getURL);
module.exports = router;