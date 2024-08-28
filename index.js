const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// internal imports
const generateURL = require("./routes/generateURL");
const redirectURL = require("./routes/redirect");
const URL = require ("./models/URL");

const app = express();

//database connection

mongoose.connect("mongodb://localhost:27017/URL_Shortner")
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


//request parses

app.use(express.json());
app.use(express.urlencoded({extended : true}))
//env config
dotenv.config();

 //set view engine

 app.set("view engine", "ejs")

//route
app.use("/",generateURL);

app.use("/",redirectURL);

app.listen(process.env.PORT, ()=>{
  console.log(`app listening to port ${process.env.PORT}`);
});