'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const auth_controller_1 = __importDefault(require('./auth/auth.controller'));
// import App from './app';
require('./lib/db/mongoCon');
require('./lib/db/redisCon');
const express_auth_library_1 = __importDefault(require('express-auth-library'));
const a = new express_auth_library_1.default(new auth_controller_1.default());
console.log(a);
// const app = new App([new authController()]);
a.listen();
