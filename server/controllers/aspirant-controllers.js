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

