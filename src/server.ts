import authController from './auth/auth.controller';
// import App from './app';
import './lib/db/mongoCon';
import './lib/db/redisCon';
import authlib from 'express-auth-library';
const a = new authlib(new authController());
console.log(a);
// const app = new App([new authController()]);

a.listen();
