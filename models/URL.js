import mongoose from "mongoose";

const urlSchema = mongoose.Schema(
    {
        shortID : {
            type : String,
            required : true,
            unique : true,
        },
        URL : {
            type : String,
            required : true,
        },
        clicks : {
            type : Number,
            required : true,
            default : 0,
        },
        qr:{
            url : {
                type : String,
                required : true,
            },
            img: {
                type : String,
            },
            scans:{
                type : Number,
                default : 0,
            },      
        },

        customName: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
     },

        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, 
        }
    },
    {
        timestamps: true,
    }
);
urlSchema.index({ user: 1, shortId: 1 }, { unique: true })
urlSchema.index({ shortId: 1 });
urlSchema.index({ customName: 1 });
urlSchema.index({ status: 1 });


const Url = mongoose.model("Url", urlSchema);

export default Url;