import mongoose from "mongoose";
const companySchema = mongoose.Schema({
    companyAccountId:{
        type:String,
        required:true,
        
    },
    companyName: {
        type:String,
        required:false,
        
    },
    locationBased :{
        type:String,
        required:false
    },
    companySize :{
        type:String,
        required:false
    },
    industryType :{
        type:String,
        required:false
    },
    companyType :{
        type:String,
        required:false
    },
    aboutCompany :{
        type:String,
        required:false
    },
    introOfCompany:{
        type:String,
        required:false
    },
    jobsList :{
        type:[String],
        required:false
    },
    employeesList :{
        type:[String],
        required:false
    },
    status :{
        type:String,
        required:false
    },
    
    
})

const company = mongoose.model('company', companySchema);
export default company;