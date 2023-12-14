import Company from '../model/company-schema.js';
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