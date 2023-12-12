import express from "express";
const Router = express.Router();
import { loginUserController, signupUserController } from "../controllers/user-controllers.js";
import { authenticateToken } from "../controllers/token-controllers.js";


Router.post('/signup',signupUserController);
Router.post('/login',loginUserController);

export default Router;