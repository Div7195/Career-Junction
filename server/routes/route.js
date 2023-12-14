import express from "express";
const Router = express.Router();
import { loginUserController, signupUserController } from "../controllers/user-controllers.js";
import { authenticateToken } from "../controllers/token-controllers.js";
import { getCompanyProfileController, updateCompanyProfileController } from "../controllers/company-controllers.js";


Router.post('/signup',signupUserController);
Router.post('/login',loginUserController);
Router.post('/updateCompanyProfile', authenticateToken,updateCompanyProfileController);
Router.get('/getCompanyProfile',authenticateToken, getCompanyProfileController);
export default Router;