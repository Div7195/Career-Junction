import express from "express";

import { loginUserController, signupUserController } from "../controllers/user-controllers.js";
import { authenticateToken } from "../controllers/token-controllers.js";
import { createJobController, deleteJobController, getCompanyProfileController, getJobApplicants, getJobMessages, getJobsController, getSingleJobController, getSingleJobSecondController, updateCompanyProfileController, updateJobController, updateJobMessages } from "../controllers/company-controllers.js";
import { applyJobController,  getAllJobsController, getAspirantProfileController, saveJobsController, updateAspirantProfileController } from "../controllers/aspirant-controllers.js";
const Router = express.Router();

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
Router.get('/getAspirantProfile',authenticateToken, getAspirantProfileController);
Router.post('/updateAspirantProfile',authenticateToken, updateAspirantProfileController);
Router.post('/saveJobs',authenticateToken, saveJobsController);
Router.get('/getAllJobs',authenticateToken, getAllJobsController);
Router.get('/getJobApplicants',authenticateToken, getJobApplicants);
Router.post('/applyToJob',authenticateToken, applyJobController);
Router.get('/getJobMessages',authenticateToken, getJobMessages);
Router.post('/updateJobMessages',authenticateToken, updateJobMessages);

export default Router;