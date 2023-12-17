import User from "../model/user-schema.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'
import Company from "../model/company-schema.js"
import Aspirant from "../model/aspirant-schema.js";
dotenv.config();

export const signupUserController = async(request, response) => {
    try {
        let temp = {};
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        
        const user = {username: request.body.username, password: hashedPassword, role:request.body.role};
        console.log(user)
        const newUser = new User(user);
        await newUser.save();
        if(newUser.role === 'company'){
            const newCompany = new Company({
                companyAccountId:newUser._id,
                companyName:'',
                locationBased:'',
                companySize:'',
                industryType:'',
                companyType:'',
                aboutCompany:'',
                introOfCompany:'',
                jobsList:[],
                employeesList:[],
                status:''
            })
            await newCompany.save();
        }else if(newUser.role === 'aspirant'){
            const newAspirant = new Aspirant({
                aspirantAccountId:newUser._id,
                aspirantName:'',
                aspirantEmail:'',
                aspirantLocation:'',
                appliedJobs:[],
                savedJobs:[],
                education:[{
                    schoolName:'',
                    course:'',
                    startYear:'',
                    finishYear:'',
                    grade:''
                }],
                projects:[{
                    projectTitle:'',
                    projectsSkills:[],
                    repoLink:'',
                    liveLink:'',
                    aboutProject:'',

                }],
                positionsOfResp:[{
                    positionTitle:'',
                    descriptionOfPosition:''
                }],
                workExperiences:[{
                    companyName:'',
                    workType:'',
                    workTitle:'',
                    location:'',
                    
                }],
                achivements:[{
                    achievementDesc:''
                }],
                certifications:[{
                    certificationTitle:'',
                    certificationDesc:'',
                    certificationLink:'',
                    

                }],
                linkedinLink:'',
                githubLink:'',
            })
            temp = newAspirant
            await newAspirant.save();
        }
        return response.status(200).json({temp, msg:'signup successfull'})
    } catch (error) {
        return response.status(500).json(error);
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
             const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn :'200m' });
             const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
             const newToken = new token({token:refreshToken});
             await newToken.save();
             return response.status(200).json({accessToken : accessToken, refreshToken : refreshToken, username : user.username,role : user.role, mongoId:user._id});
        }else{
            return response.status(400).json({msg:'Password does not match'});
        }
    } catch (error) {
        return response.status(500).json({msg:'Error while login user'});
    }
}