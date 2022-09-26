"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_services_1 = __importDefault(require("./auth.services"));
const verifyJWT_1 = __importDefault(require("../lib/jwt/verifyJWT"));
const express_validation_1 = require("express-validation");
const auth_validation_1 = require("./auth.validation");
const permissions_1 = require("../middleware/permissions");
const AuthService = new auth_services_1.default();
class Controller {
    constructor() {
        this.router = express_1.default.Router();
        this.path = '/auth';
        this.initializeRoutes();
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield AuthService.signup(req.body, req.headers);
                res.status(201).json({
                    success: true,
                    data: result,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield AuthService.login(req.body);
                res.status(200).json({ data: result });
            }
            catch (e) {
                next(e);
            }
        });
    }
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body.refreshToken);
                const result = yield AuthService.refreshToken(req.body.refreshToken);
                res.status(200).json({ data: result });
            }
            catch (e) {
                next(e);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield AuthService.logout(req.body);
                res.status(204).json({ success: true });
            }
            catch (e) {
                next(e);
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield AuthService.forgotPassword(req.headers);
                res.status(200).json({
                    sucess: true,
                    message: `Reset Password email sent to ${result.email}`,
                    data: result,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield AuthService.resetPassword(req.params, req.body, req.headers.authorization);
                res.status(200).json({
                    success: true,
                    data: result,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    verifyEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield AuthService.verifyEmail(req.headers.authorization);
                res.status(200).json({
                    success: true,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, (0, express_validation_1.validate)({ body: auth_validation_1.registerSchema }), this.signup);
        this.router.post(`${this.path}/login`, (0, express_validation_1.validate)({ body: auth_validation_1.loginSchema }), this.login);
        this.router.post(`${this.path}/refreshtoken`, verifyJWT_1.default.verifyAccessToken, this.refreshToken);
        this.router.post(`${this.path}/forgotpassword`, verifyJWT_1.default.verifyAccessToken, permissions_1.isEmailVerified, this.forgotPassword);
        this.router.delete(`${this.path}/logout`, verifyJWT_1.default.verifyAccessToken, 
        // isEmailVerified,
        this.logout);
        this.router.get(`${this.path}/verifyemail`, this.verifyEmail);
        this.router.patch(`${this.path}/resetpassword/:token`, (0, express_validation_1.validate)({ body: auth_validation_1.resetPassSchema }), this.resetPassword);
    }
}
exports.default = Controller;
