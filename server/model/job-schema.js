import mongoose from "mongoose";
const jobSchema = mongoose.Schema({
    companyId: {
        type:String,
        required:true,
        unique:true
    },
    jobTitle :{
        type:String,
        required:true
    },
    jobType :{
        type:String,
        required:true
    },
    
    salary :{
        type:String,
        required:true
    },
    duration :{
        type:String,
        required:false
    },
    location :{
        type:String,
        required:true,
        default:''
    },
    startDate :{
        type:Date,
        required:true
    },
    skillsRequired :{
        type:[String],
        required:true
    },
    applyDeadlineDate :{
        type:Date,
        required:true
    },
    jobCreateDate :{
        type:Date,
        required:true
    },
    workHours :{
        type:String,
        required:true
    },
    jobRequirements :{
        type:String,
        required:true
    },
    reponsibilities :{
        type:String,
        required:true
    },
    hiringProcess :{
        type:String,
        required:true
    },
    
})

const job = mongoose.model('jobs', jobSchema);
export default job;