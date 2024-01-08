import Company from '../model/company-schema.js';
import Job from '../model/job-schema.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'
import Aspirant from '../model/aspirant-schema.js';
export const updateCompanyProfileController=async(request , response)=>{
    try {
        
        let temp = await Company.findOne({companyAccountId:request.body.companyAccountId});
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        const options = { new: true };
        await Company.findOneAndUpdate({companyAccountId:request.body.companyAccountId}, request.body, options);
        
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
            lowerSalary : request.body.lowerSalary,
            upperSalary : request.body.upperSalary,
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
        
        const options = { new: true };
        await Company.findOneAndUpdate({companyAccountId:request.body.companyId}, temp, options);
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
        const options = { new: true };
        await Job.findOneAndUpdate({_id:request.query.jobId}, request.body, options);
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

export const getJobApplicants = async(request, response) => {
    try {
        let aspirantObjList = []
        let jobObj = await Job.findOne({_id:request.query.jobId});
        
        // let company = await Company.findOne({companyAccountId:jobObj.companyId});

        for(let i = 0;i<jobObj.appliedAspirantsId.length;i++){
            
            let temp = await Aspirant.findOne({aspirantAccountId:jobObj.appliedAspirantsId[i]});
           
            aspirantObjList.push(temp)
        }
        
        return response.status(200).json({applicants:aspirantObjList});
    } catch (error) {
        return response.status(500).json('failed single job and company fetch');
    }
}

export const getJobMessages = async(request, response) => {
    try {
        
        let aspirantObj = await Aspirant.findOne({aspirantAccountId:request.query.aspirantAccountId});
        let messagesObj = {};
        
        // let company = await Company.findOne({companyAccountId:jobObj.companyId});

        for(let i = 0;i<aspirantObj.applications.length;i++){
            if(request.query.jobId === aspirantObj.applications[i].jobId){
                messagesObj = aspirantObj.applications[i];
                break;
            }
        }
        
        return response.status(200).json({messagesObj});
    } catch (error) {
        return response.status(500).json('failed messages fetch');
    }
}

export const updateJobMessages = async(request, response) => {
    try {
        let aspirantObj = await Aspirant.findOne({aspirantAccountId:request.body.aspirantAccountId});
        
        // let company = await Company.findOne({companyAccountId:jobObj.companyId});

        for(let i = 0;i<aspirantObj.applications.length;i++){
            if(request.body.jobId === aspirantObj.applications[i].jobId){
                aspirantObj.applications[i].messages.push(request.body.newMessage);
                break;
            }
        }
        
        const options = { new: true };
        await Aspirant.findOneAndUpdate({aspirantAccountId:request.body.aspirantAccountId}, aspirantObj, options);
        
        
        return response.status(200).json({msg:'success'});
    } catch (error) {
        return response.status(500).json('failed messages update');
    }
}

export const getCompanyChatsController = async(request, response) => {
    try {
        let result = []
        let companyJobs = await Job.find({companyId:request.query.companyAccountId});
        if(companyJobs){
            for(let i = 0; i < companyJobs.length; i++){
                for(let j = 0; j<companyJobs[i].appliedAspirantsId.length; j++){
                    let aspirant = await Aspirant.findOne({aspirantAccountId:companyJobs[i].appliedAspirantsId[j]});
                    
                    if(aspirant){
                        for(let k = 0; k < aspirant.applications.length;k++){
                            
                            if(aspirant.applications[k].jobId === companyJobs[i]._id.toString()){
                                
                                if(aspirant.applications[k].messages.length > 0){
                                    result.push({
                                        jobId:companyJobs[i]._id,
                                        aspirantAccountId:aspirant.aspirantAccountId,
                                        aspirantName:aspirant.aspirantName,
                                        jobTitle:companyJobs[i].jobTitle,
                                        jobType:companyJobs[i].jobType,
                                        lastMessage:aspirant.applications[k].messages[aspirant.applications[k].messages.length-1].messageBody,
                                        lastMessageTimestamp:aspirant.applications[k].messages[aspirant.applications[k].messages.length-1].messageTimestamp,
                                        lastMessageSentBy:aspirant.applications[k].messages[aspirant.applications[k].messages.length-1].senderRole,
                                        chatId:aspirant.applications[i]._id.toString()
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
        
        
       
        return response.status(200).json({data:result});
    } catch (error) {
        return response.status(500).json('failed messages fetch');
    }
}