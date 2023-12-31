import mongoose from "mongoose";
const jobSchema = mongoose.Schema({
    companyId: {
        type:String,
        required:true,
        
    },
    jobTitle :{
        type:String,
        required:true
    },
    jobType :{
        type:String,
        required:true
    },
    
    lowerSalary :{
        type:Number,
        required:true
    },
    upperSalary :{
        type:Number,
        required:true
    },
    openings:{
        type:String,
        required:true
    },
    duration :{
        type:String,
        required:true
    },

    location :{
        type:String,
        required:true,
        default:'Remote|home|remote|Home'
    },
    startDate :{
        type:Date,
        required:true
    },
    skillsRequired :{
        type:[String],
        required:true
    },
    appliedAspirantsId :{
        type:[String],
        required:false
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
    responsibilities :{
        type:String,
        required:true
    },
    hiringProcess :{
        type:String,
        required:true
    },
    
})

const job = mongoose.model('job', jobSchema);
export default job;