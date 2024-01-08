import Company from '../model/company-schema.js';
import Job from '../model/job-schema.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'
import Aspirant from '../model/aspirant-schema.js';
import company from '../model/company-schema.js';

export const getAspirantProfileController = async(request, response) => {
    
    try{
        let temp = await Aspirant.findOne({aspirantAccountId:request.query.aspirantAccountId});
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        return response.status(200).json(temp);
    }
    catch(error){
        return response.status(500).json(error);
    }
}
export const updateAspirantProfileController = async(request, response) => {
    
    try{
        
        let temp = await Aspirant.findOne({aspirantAccountId:request.query.aspirantAccountId});
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        for(const key in request.body){
            temp[key] = request.body[key];
        }
        const options = { new: true };
        await Aspirant.findOneAndUpdate({aspirantAccountId:request.query.aspirantAccountId}, temp, options);
        return response.status(200).json(temp);
    }
    catch(error){
        return response.status(500).json(error);
    }
}
export const saveJobsController = async(request, response) => {
    
    try{
        let temp = await Aspirant.findOne({aspirantAccountId:request.query.aspirantAccountId});
        
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        temp = {...temp._doc, savedJobs:[...temp._doc.savedJobs, request.query.jobId]};
        const options = { new: true };
        await Aspirant.findOneAndUpdate({aspirantAccountId:request.query.aspirantAccountId}, temp, options);
        return response.status(200).json({msg:'success'});
    }
    catch(error){
        return response.status(500).json(error);
    }
}
export const getAllJobsController = async(request, response) => {

    try{
        
        let objArrayOfJobs = [];
        // console.log(request.query.jobType === '')
        // console.log(request.query.minSalary === '')
        // console.log(request.query.location === '')
        // console.log(request.query.sortBy === '')
        // console.log(request.query.skillsRequired.length === 0 )
        objArrayOfJobs = await Job.find();
        if(request.query.jobType === '' && request.query.minSalary === ''&& request.query.location === '' && request.query.sortBy === '' && request.query.skillsRequired.length === 0) {
            
            for(let i = 0;i<objArrayOfJobs.length;i++){
            let tempCompany = await Company.findOne({companyAccountId:objArrayOfJobs[i].companyId});
            objArrayOfJobs[i] = {...objArrayOfJobs[i]._doc,companyName:tempCompany.companyName, locationBased:tempCompany.locationBased};
            
        }
        return response.status(200).json({objArrayOfJobs});
        }else{
            if(request.query.jobType !== ''){
                objArrayOfJobs = objArrayOfJobs.filter((obj) => {
                    if(obj.jobType === request.query.jobType) return obj
                })
            }
            if(request.query.location !== ''){
                objArrayOfJobs = objArrayOfJobs.filter((obj) => {
                    if(obj.location === request.query.location) return obj
                })
            }if(request.query.minSalary !== ''){
                objArrayOfJobs = objArrayOfJobs.filter((obj) => {
                    if(obj.upperSalary >= request.query.minSalary) return obj
                })
            }
            if(request.query.skillsRequired.length > 0){
                objArrayOfJobs = objArrayOfJobs.filter((obj) => {
                    for(let i = 0;i<obj.skillsRequired.length;i++){
                        
                        if(request.query.skillsRequired.includes(obj.skillsRequired[i])){
                            return obj
                        }
                    }
                })
            }
            if(request.query.sortBy !== ''){
                if(request.query.sortBy === 'Ascending Salary'){
                    objArrayOfJobs.sort((a, b) => {
                        return a.upperSalary - b.upperSalary
                    })

                }else if(request.query.sortBy === 'Descending Salary'){
                    objArrayOfJobs.sort((a, b) => {
                        return b.upperSalary - a.upperSalary
                    })
                }else if(request.query.sortBy === 'Old To New'){
                    objArrayOfJobs.sort((a, b) => {
                        return dayjs(a.jobCreateDate).getTime() - dayjs(b.jobCreateDate).getTime()
                    })
                }else{
                    objArrayOfJobs.sort((a, b) => {
                        return dayjs(b.jobCreateDate).getTime() - dayjs(a.jobCreateDate).getTime()
                    })
                }
            }
            for(let i = 0;i<objArrayOfJobs.length;i++){
                let tempCompany = await Company.findOne({companyAccountId:objArrayOfJobs[i].companyId});
                objArrayOfJobs[i] = {...objArrayOfJobs[i]._doc,companyName:tempCompany.companyName, locationBased:tempCompany.locationBased};
                
            }
            return response.status(200).json({objArrayOfJobs});

            

        }
        

    }catch(error){
        return response.status(500).json('failed job fetching');
    }
}

export const applyJobController = async(request, response) => {
    try {
        let job = await Job.findOne({_id:request.body.jobId});
        if(!job){
            return response.status(404).json('cant find job');
        }
        let aspirant = await Aspirant.findOne({aspirantAccountId:request.body.aspirantAccountId});
        
        if(!aspirant){
            return response.status(404).json('cant find aspirant')
        }
        job = {...job._doc, appliedAspirantsId:[...job._doc.appliedAspirantsId, request.body.aspirantAccountId]};
        aspirant._doc.applications.push({
            jobId:request.body.jobId,
            applicationStatus:'Applied',
            messages:[]
        })
        const options = { new: true };
        await Job.findOneAndUpdate({_id:request.body.jobId}, job, options);
        await Aspirant.findOneAndUpdate({aspirantAccountId:request.body.aspirantAccountId}, aspirant, options)
        return response.status(200).json({msg:'success job update'});
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const getAllChatsController = async(request, response) => {
    try {
        
        let aspirantObj = await Aspirant.findOne({aspirantAccountId:request.query.aspirantAccountId});
        let chatsList = [];
        
        // let company = await Company.findOne({companyAccountId:jobObj.companyId});

        for(let i = 0;i<aspirantObj.applications.length;i++){
            if(aspirantObj.applications[i].messages.length > 0){
            let job = await Job.findOne({_id:aspirantObj.applications[i].jobId});
                if(job){
                    let company = await Company.findOne({companyAccountId:job.companyId});
                    if(company){
                        chatsList.push({
                            jobId:job._id,
                            companyName:company.companyName,
                            lastMessage:aspirantObj.applications[i].messages[aspirantObj.applications[i].messages.length - 1].messageBody,
                            lastMessageTime:aspirantObj.applications[i].messages[aspirantObj.applications[i].messages.length - 1].messageTimestamp,
                            lastMessageSentBy:aspirantObj.applications[i].messages[aspirantObj.applications[i].messages.length - 1].senderRole,
                            jobTitle:job.jobTitle,
                            jobType:job.jobType,
                            companyImage:company.companyImage,
                            chatId:aspirantObj.applications[i]._id.toString()
                        })
                    }
                }
                }
            }
        
       
        return response.status(200).json({data:chatsList});
    } catch (error) {
        return response.status(500).json('failed messages fetch');
    }
}

export const getCompaniesController = async(request, response) => {
    try {
        let companiesList = []
        let temp = await Company.find({})
        let queryLength = request.query.searchInput.length
        
        if(request.query.searchInput === ''){
            for(let i = 0;i<temp.length;i++){
           
                companiesList.push({
                    companyAccountId:temp[i].companyAccountId,
                    companyName:temp[i].companyName,
                    industryType:temp[i].industryType,
                    companyImage:temp[i].companyImage,
                    jobsPosted: temp[i].jobsList.length 
                })
            }
        }else{
            for(let i = 0;i<temp.length;i++){
                
                if(temp[i].companyName.length >= queryLength){
                    let slicedString = temp[i].companyName.slice(0, queryLength)
                    
                    if(slicedString.toLowerCase() === request.query.searchInput.toLowerCase()){
                        
                        companiesList.push({
                            companyAccountId:temp[i].companyAccountId,
                            companyName:temp[i].companyName,
                            industryType:temp[i].industryType,
                            companyImage:temp[i].companyImage,
                            jobsPosted: temp[i].jobsList.length 
                        })
                }
                
            }
            }
        }
        
        return response.status(200).json({
            data:companiesList
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json('failed companies fetch')
    }
}








