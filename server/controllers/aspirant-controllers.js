import Company from '../model/company-schema.js';
import Job from '../model/job-schema.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'
import Aspirant from '../model/aspirant-schema.js';

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
        console.log(request.body)
        let temp = await Aspirant.findOne({aspirantAccountId:request.query.aspirantAccountId});
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        for(const key in request.body){
            temp[key] = request.body[key];
        }
        await Aspirant.findOneAndReplace({aspirantAccountId:request.query.aspirantAccountId}, temp);
        return response.status(200).json(temp);
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
                        console.log(obj)
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




