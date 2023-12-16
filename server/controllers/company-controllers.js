import Company from '../model/company-schema.js';
import Job from '../model/job-schema.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'

export const updateCompanyProfileController=async(request , response)=>{
    try {
        console.log(request.body.companyAccountId);
        let temp = await Company.findOne({companyAccountId:request.body.companyAccountId});
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        await Company.findOneAndReplace({companyAccountId:request.body.companyAccountId}, request.body);
        
        return response.status(200).json("Company profile updated success!")
    } 
        catch (error) {
            return response.status(500).json(error)
        }
    
}

export const getCompanyProfileController = async(request, response) => {
    
    try{
        let temp = await Company.findOne({companyAccountId:request.query.companyAccountId});
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        return response.status(200).json(temp);
    }
    catch(error){
        return response.status(500).json(error);
    }
}

export const createJobController = async(request, response) => {
    let temp = await Company.findOne({companyAccountId:request.body.companyId});
    if(!temp){
        return response.status(409).json({msg:'unsuccessfull'});
    }
    try {
        const job = {
            companyId : request.body.companyId,
            jobTitle : request.body.jobTitle,
            jobType : request.body.jobType,
            salary : request.body.salary,
            openings : request.body.openings,
            duration:request.body.duration,
            location : request.body.location,
            startDate : request.body.startDate,
            skillsRequired : request.body.skillsRequired,
            applyDeadlineDate : request.body.applyDeadlineDate,
            jobCreateDate : request.body.jobCreateDate,
            workHours : request.body.workHours,
            jobRequirements : request.body.jobRequirements,
            responsibilities : request.body.responsibilities,
            hiringProcess : request.body.hiringProcess
        };
        const newJob = new Job(job);
        
        await newJob.save();
        temp.jobsList.push(newJob._id);
        console.log(temp)
        await Company.findOneAndReplace({companyAccountId:request.body.companyId}, temp);
        return response.status(200).json({msg:'created job successfull'})
    } catch (error) {

        return response.status(500).json(error)
    }
}

export const getJobsController = async(request, response) => {

    try{
        let objArrayOfJobs = [];
        objArrayOfJobs = await Job.find({companyId:request.query.companyAccountId});
        let company = await Company.findOne({companyAccountId:request.query.companyAccountId});
        return response.status(200).json({objArrayOfJobs, locationBased:company.locationBased, companyName:company.companyName});

    }catch(error){
        return response.status(500).json('failed job fetching');
    }
}

export const getSingleJobController = async(request, response) => {

    try {
        
        let jobObj = await Job.findOne({_id:request.query.jobId});
        let company = await Company.findOne({companyAccountId:jobObj.companyId});
        return response.status(200).json({jobObj, locationBased:company.locationBased, companyName:company.companyName});
    } catch (error) {
        return response.status(500).json('failed single job fetching');
        
    }
}

export const updateJobController = async(request, response) => {

    try {
        let temp = Job.findOne({_id:request.query.jobId});
        if(!temp){
            return response.status(404).json('failed job update not found');
        }
        await Job.findOneAndReplace({_id:request.query.jobId}, request.body);
        return response.status(200).json('success job update');
    } catch (error) {
        return response.status(500).json('failed job updating');
    }
}

export const deleteJobController = async(request, response) => {

    try {
        let temp = Job.findOne({_id:request.query.jobId});
        if(!temp){
            return response.status(404).json('failed job delete not found');
        }
        await Job.findOneAndDelete({_id:request.query.jobId}, request.body);
        return response.status(200).json('success job delete');
    } catch (error) {
        return response.status(500).json('failed job delete');
    }
}

export const getSingleJobSecondController = async(request, response) => {

    try {
        let jobObj = await Job.findOne({_id:request.query.jobId});
        let company = await Company.findOne({companyAccountId:jobObj.companyId});
        return response.status(200).json({jobObj, locationBased:company.locationBased, companyName:company.companyName, aboutCompany:company.aboutCompany, introOfCompany:company.introOfCompany});
    } catch (error) {
        return response.status(500).json('failed single job and company fetch');
    }
}