import express from "express";
const Router = express.Router();
import { loginUserController, signupUserController } from "../controllers/user-controllers.js";
import { authenticateToken } from "../controllers/token-controllers.js";
import { createJobController, deleteJobController, getCompanyProfileController, getJobsController, getSingleJobController, getSingleJobSecondController, updateCompanyProfileController, updateJobController } from "../controllers/company-controllers.js";


Router.post('/signup',signupUserController);
Router.post('/login',loginUserController);
Router.post('/updateCompanyProfile', authenticateToken,updateCompanyProfileController);
Router.get('/getCompanyProfile',authenticateToken, getCompanyProfileController);
Router.post('/createJob',authenticateToken, createJobController);
Router.get('/getJobs', authenticateToken, getJobsController);
Router.get('/getSingleJob', authenticateToken, getSingleJobController);
Router.get('/updateJob', authenticateToken, updateJobController);
Router.get('/deleteJob', authenticateToken, deleteJobController);
Router.get('/getSingleJobAndCompany', authenticateToken, getSingleJobSecondController);

export default Router;