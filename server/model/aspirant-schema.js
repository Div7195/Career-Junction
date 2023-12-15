import mongoose from "mongoose";
const aspirantSchema = mongoose.Schema({
    aspirantAccountId:{
        type:String,
        required:true,
        unique:true
    },
    aspirantName: {
        type:String,
        required:true,
        
    },
    aspirantEmail :{
        type:String,
        required:true
    },
    aspirantLocation :{
        type:String,
        required:true
    },
    education :[{
        schoolName : {
            
            type:String,
            required:true,

        },
        course:{
            type:String,
            required:true,

        },
        startYear:{
            type:Integer,
            required:true
        },
        finishYear:{
            type:Integer,
            required:true
        },
        grade:{
            type:Integer,
            required:true
        }
}],
    projects:[{
        projectTitle:{
            type:String,
            required:true
        },
        skills:[
                {
                    skill:{
                        type:String,
                        required:true
                    }
                    
                }
            ],
        repoLink:{
            type:String,
            required:true
        },
        liveLink:{
            type:String,
            required:true
        },
        aboutProject:{
            type:String,
            required:true
        }
}],
    positionsOfResp:[{
        positionTitle:{
            type:String,
            required:true
        },
    descriptionOfPosition:{
        type:String,
        required:true
    }
    }   
    ],
    workExperiences:[{
        companyName:{
            type:String,
            required:true
        },
        workType:{
            type:String,
            required:true
        },
        workTitle:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        startDate:{
            type:Date,
            required:true
        },
        endDate:{
            type:Date,
            required:true
        }
}],
    achievements:[{
        achievement:{
            type:String,
            required:true
        }
}],
    certifications:[{
        certificationTitle:{
            type:String,
            required:true
        },
        certificatinDesc:{
            type:String,
            required:true
        },
        certificationLink:{
            type:String,
            required:true
        },
        certificateIssueDate:{
            type:Date,
            required:true
        }
}],
    linkedinLink:{
        type:String,
        required:false
    },
    githubLink:{
        type:String,
        required:false
    }

    
    
    
})

const aspirant = mongoose.model('aspirant', aspirantSchema);
export default aspirant;