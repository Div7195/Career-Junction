import mongoose from "mongoose";
const aspirantSchema = mongoose.Schema({
    aspirantAccountId:{
        type:String,
        required:false,
    },
    aspirantName: {
        type:String,
        required:false,
        
    },
    aspirantEmail :{
        type:String,
        required:false
    },
    aspirantLocation :{
        type:String,
        required:false
    },
    aspirantDomains:{
        type:[String],
        required:false
    },
    savedJobs:{
        type:[String],
        required:false
    },
    domains :{
        type:[String],
        required:false
    },
    applications:[{
    
        jobId:{
            type:String,
            required:false
        },
        applicationStatus:{
            type:String,
            required:false
        },
        messages:[{
            senderRole:{
                type:String,
                required:false
            },
            messageBody:{
                type:String,
                required:false
            },
            messageTimestamp:{
                type:Date,
                required:false
            }
    }]
    }],

    education :[{
        schoolName : {
            
            type:String,
            required:false,

        },
        course:{
            type:String,
            required:false,

        },
        startYear:{
            type:Date,
            required:false
        },
        finishYear:{ 
            type:Date,
            required:false
        },
        grade:{
            type:String,
            required:false
        }
}],
    projects:[{
        projectTitle:{
            type:String,
            required:false
        },
        projectSkills:[String],
        repoLink:{
            type:String,
            required:false
        },
        liveLink:{
            type:String,
            required:false
        },
        aboutProject:{
            type:String,
            required:false
        },
        startDate:{
            type:Date,
            required:false
        },
        finishDate:{
            type:Date,
            required:false
        }
}],
    positionsOfResp:[{
        positionTitle:{
            type:String,
            required:false
        },
        descriptionOfPosition:{
            type:String,
            required:false
        },
        positionSkills:{
            type:[String],
            required:false
        }
    }   
    ],
    workExperiences:[{
        companyName:{
            type:String,
            required:false
        },
        workTitle:{
            type:String,
            required:false
        },
        aboutWork:{
            type:String,
            required:false
        },
        location:{
            type:String,
            required:false
        },
        startDate:{
            type:Date,
            required:false
        },
        finishDate:{
            type:Date,
            required:false
        },
        workSkills:{
            type:[String],
            required:false
        }
}],
    achievements:[{
        achievementDesc:{
            type:String,
            required:false
        }
}],
    certifications:[{
        certificationTitle:{
            type:String,
            required:false
        },
        certificationDesc:{
            type:String,
            required:false
        },
        certificationLink:{
            type:String,
            required:false
        },
        certificateIssueDate:{
            type:Date,
            required:false
        },
        certificateSkills:{
            type:[String],
            required:false
        }
}],
    linkedinLink:{
        type:String,
        required:false
    },
    githubLink:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    }
    

    
    
    
})

const aspirant = mongoose.model('aspirant', aspirantSchema);
export default aspirant;