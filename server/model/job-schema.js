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
    stipend :{
        type:Integer,
        required:true
    },
    salary :{
        type:Integer,
        required:true
    },
    duration :{
        type:String,
        required:false
    },
    location :{
        type:String,
        required:true
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
    aboutJob :{
        type:String,
        required:true
    },
    
})

const job = mongoose.model('jobs', jobSchema);
export default job;