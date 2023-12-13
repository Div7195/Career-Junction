import mongoose from "mongoose";
const companySchema = mongoose.Schema({
    companyAccountId:{
        type:String,
        required:true,
        unique:true
    },
    companyName: {
        type:String,
        required:true,
        
    },
    locationBased :{
        type:String,
        required:true
    },
    companySize :{
        type:String,
        required:true
    },
    industryType :{
        type:Integer,
        required:true
    },
    companyType :{
        type:Integer,
        required:true
    },
    aboutCompany :{
        type:String,
        required:false
    },
    jobsList :{
        type:[String],
        required:true
    },
    employeesList :{
        type:[String],
        required:true
    },
    status :{
        type:String,
        required:true
    },
    
    
})

const company = mongoose.model('company', companySchema);
export default company;