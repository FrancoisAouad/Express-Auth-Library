"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_form_data_1 = __importDefault(require("express-form-data"));
const errorHandlers_1 = require("./utils/handlers/errorHandlers");
require("colors");
// import authlib from 'express-auth-library';
dotenv_1.default.config();
class App {
    //CONSTRUCTOR
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.securityMiddleWares();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandlers();
    }
    //SERVER
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`.blue.italic.bold);
        });
    }
    //SECURITY
    securityMiddleWares() {
        this.app.use((0, helmet_1.default)());
    }
    //MIDDLEWARE
    initializeMiddlewares() {
        if (process.env.NODE_ENV == 'development')
            this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, compression_1.default)());
        // this.app.use(cors(corsConfig));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_form_data_1.default.parse());
    }
    //ERROR HANDLERS
    initializeErrorHandlers() {
        this.app.use(errorHandlers_1.sendError);
        this.app.use(errorHandlers_1.errorHandler);
    }
    //CONTROLLERS
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api/v1', controller.router);
        });
    }
}
exports.default = App;
