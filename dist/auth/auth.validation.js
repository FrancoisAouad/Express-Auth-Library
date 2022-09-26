"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassSchema = exports.loginSchema = exports.registerSchema = void 0;
const express_validation_1 = require("express-validation");
exports.registerSchema = express_validation_1.Joi.object({
    email: express_validation_1.Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
    fullname: express_validation_1.Joi.string().lowercase(),
    username: express_validation_1.Joi.string().alphanum().min(3).max(30).required(),
    password: express_validation_1.Joi.string()
        .min(6)
        .max(48)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: express_validation_1.Joi.ref('password'),
});
exports.loginSchema = express_validation_1.Joi.object({
    email: express_validation_1.Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
    password: express_validation_1.Joi.string()
        .min(6)
        .max(48)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: express_validation_1.Joi.ref('password'),
});
exports.resetPassSchema = express_validation_1.Joi.object({
    password: express_validation_1.Joi.string()
        .min(6)
        .max(48)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: express_validation_1.Joi.ref('password'),
});
