//external imports
const {check,validationResult} = require("express-validator");


// internal imports
const URL = require("../models/URL");




// URL validation 
const urlValidationRules = [
    check('url')
        .trim()
        .notEmpty().withMessage('URL is required')
        .isURL()
        .withMessage('Invalid URL format')
        .isLength({ max: 2048 })
        .withMessage('URL is too long, must be less than 2048 characters')
];

const validateUrl = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { urlValidationRules, validateUrl };