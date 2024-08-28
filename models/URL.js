const mongoose = require("mongoose");

const urlschema = mongoose.Schema(
    {
        shortID : {
            type : String,
            required : true,
            unique : true,
        },
        URL : {
            type : String,
            required : true,
        }
    },
    {
        timestamps: true,
    }
);

const Url = mongoose.model("Url", urlschema);

module.exports = Url;