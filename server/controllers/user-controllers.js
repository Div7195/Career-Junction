import User from "../model/user-schema.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'
dotenv.config();

export const signupUserController = async(request, response) => {
    try {
        
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        
        const user = {username: request.body.username, password: hashedPassword, role:request.body.role};
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({msg:'signup successfull'})
    } catch (error) {
        return response.status(500).json({msg:'error while signup the user'});
    }
}

export const loginUserController = async(request, response) => {
    let user = await User.findOne({username : request.body.username});
    if(!user){
        return response.status(400).json({msg:'Username does not exist'});
    }
    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match){
             const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn :'30m' });
             const refershToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
             const newToken = new token({token:refershToken});
             await newToken.save();
             return response.status(200).json({accessToken : accessToken, refershToken : refershToken, username : user.username, mongoId:user._id});
        }else{
            return response.status(400).json({msg:'Password does not match'});
        }
    } catch (error) {
        return response.status(500).json({msg:'Error while login user'});
    }
}