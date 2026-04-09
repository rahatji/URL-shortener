import mongoose from "mongoose";
import Joi from "joi";


const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: () => {
            return this.role === 'local';
        },
        minlength: 5,
        maxlength: 1024,
        
    },
     resetPasswordToken: {
        type: String,
        default: ''
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    image: {
        url: { type: String, default: '' },
        data: { type: Buffer },
        contentType: { type: String },
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: ''
    },
    tokenExpiry: {
        type: Date,
        default: null
    },
    lastSignedIn: {
        type: Date,
        default: null
    },

});
const User = mongoose.model("User", userschema);

export function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),

        email: Joi.string().email().required(),

        password: Joi.string().min(5).max(1024)
            .when('provider', {
                is: 'local',
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        provider: Joi.string().valid('local', 'google').default('local'),

        role: Joi.string().valid('user', 'admin').default('user'),

        image: Joi.object({
            url: Joi.string().allow('').optional(),
            data: Joi.binary().optional(),
            contentType: Joi.string().optional()
        }).optional(),

        resetPasswordToken: Joi.string().allow('').optional(),

        resetPasswordExpires: Joi.date().allow(null).optional(),

        isVerified: Joi.boolean().default(false),

        verificationToken: Joi.string().allow('').optional(),

        tokenExpiry: Joi.date().allow(null).optional(),

        lastSignedIn: Joi.date().allow(null).optional(),

        createdAt: Joi.date().optional()
    });

    return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;
