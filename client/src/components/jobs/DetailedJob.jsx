import CompanySidebar from "../sidebar/CompanySidebar"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TagIcon from '@mui/icons-material/Tag';
import monthMap from "../../constants/monthMap";

const job = {
    companyId: '3123123',
    companyName:'Microsoft',
    companyBased:'Bangalore',
    jobTitle :'Frontend Developer',
    jobType :'Internship',
    
    salary :'Rs. 9K-12K',
    duration :'3 months',
    location :'Remote',
    openings:10,
    startDate :12/11/23,
    skillsRequired :['React', 'Javascript', 'HTML', 'Angular'],
    applyDeadlineDate :14/4/23,
    jobCreateDate :11/3/22,
    workHours :'7-8 hours',
    reponsibilities :`Algorithm Development: Collaborate with the Computer Vision team to design, implement, and optimize state-of-the-art computer vision algorithms for 3D scanning applications.
    Image Processing: Work on enhancing image quality, feature extraction, and pattern recognition to improve the overall performance of the 3D scanning system.
    Documentation: Create comprehensive documentation for implemented algorithms, procedures, and system configurations
    `,
    hiringProcess:`Shortlisted candidates will get a short assignment
    Candidates with decent submissions will be interviewed on Zoom
    Selected candidates will be intimated via email/telephone` ,
    jobRequirements:`Currently pursuing or recently completed a degree in Computer Science, Computer Engineering, or a related field.
    Strong programming skills, with expertise in Python. Familiarity with C++ is a plus.
    Proficiency in computer vision libraries, especially OpenCV and Open3D.
    Familiarity with Point Cloud Library (PCL) for advanced 3D processing is a plus.
    Desirable experience with CUDA for parallel computing tasks.`,
}


const DetailedJob = () => {

    return(
        <>
        <div style={{
            display:'flex',
            flexDirection:'row'
          }}>
          <CompanySidebar/>
            <div style={{
                display:'flex',
                width:'100%',
                justifyContent:'center',
            }}>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    flexWrap:'wrap',
                    flexBasis:'95%',
                    border:'2px solid red',
                    padding:'10px'
                }}>

                {/* {Start of main details of job div} */}
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    border:'2px solid black',
                    padding:'10px'
                }}>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    padding:'5px',
                    border:'2px solid green'
                }}>
                    <div>
                    Full stack developer internship
                    </div>

                    <div style={{
                        marginRight:'0px',
                        marginLeft:'auto',
                        
                    }}>
                    Work From home

                    </div>
                </div>

                <div style={{
                    border:'2px solid blue',
                    padding:'5px',
                }}>
                Web3Scope | India
                </div>

                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    padding:'5px',
                    border:'2px solid orange'
                }}>
                    <div style={{
                        border:'2px solid green',
                        color: '#445ee2',
                        
                    }}>
                        Apply by 27 December 2023 • Posted 14h ago
                    </div>
                    
                    <div style={{
                        marginRight:'10px',
                        marginLeft:'auto'
                    }}>
                    <div style={{
                    
                    marginLeft:'10px',
                    fontSize:'16px',
                    fontFamily:'DM Sans',
                    backgroundColor:'#142683',
                    borderRadius:'5px',
                    fontWeight:700,
                    cursor:'pointer',
                    padding: '8px 20px 8px 16px',
                    color:'white'
                }}>Apply Now</div>
                    </div>
                    

                </div>

                

                </div>
                {/* {End of main details of job div} */}


                {/* {Start of Job details div} */}
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    marginBottom:'10px',
                    border:'2px solid black',
                    marginTop:'20px',
                    padding:'10px'
                }}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        paddingRight:'5px',
                        
                        
                    }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            lineHeight: '1.75rem',
                            letterSpacing: '-.02em',
                            fontWeight: '500',
                            color: '#9eaab7',
                            fontFamily: "DM Sans"
                        }}>
                        <div>
                        <AttachMoneyIcon style={{
                            margin:-5
                        }}/>
                        </div>
                        <div style={{
                            marginLeft:'2px'
                        }}>
                        {
                            job.jobType === 'Internship'? 'Salary per month' : 'Job offer'
                        }
                        
                        </div>
                        </div>
                        <div style={{
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans',
                            fontWeight:'bold'
                        }}>
                            {job.salary}
                        </div>
                        
                        
                    </div>
                    {
                        job.jobType === 'Internship' ?
                        <div style={{
                        display:'flex',
                        flexDirection:'column',
                        
                    }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            lineHeight: '1.75rem',
                            letterSpacing: '-.02em',
                            fontWeight: '500',
                            color: '#9eaab7',
                            fontFamily: "DM Sans"
                        }}>
                        <div>
                        <AccessTimeIcon style={{
                            margin:-5
                        }}/>
                        </div>
                        <div style={{
                            marginLeft:'2px'
                        }}>
                        Duration
                        </div>
                        </div>
                        <div style={{
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans',
                            fontWeight:'bold'
                        }}>
                            {job.duration}
                        </div>
                    </div>:
                    <div></div>
                    }
                    
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        
                    }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            lineHeight: '1.75rem',
                            letterSpacing: '-.02em',
                            fontWeight: '500',
                            color: '#9eaab7',
                            fontFamily: "DM Sans"
                        }}>
                        <div>
                        <WorkOutlineIcon style={{
                            margin:-5
                        }}/>
                        </div>
                        <div style={{
                            marginLeft:'2px'
                        }}>
                        Work hours
                        </div>
                        </div>
                        <div style={{
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans',
                            fontWeight:'bold'
                        }}>
                            {job.workHours}
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        
                    }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            lineHeight: '1.75rem',
                            letterSpacing: '-.02em',
                            fontWeight: '500',
                            color: '#9eaab7',
                            fontFamily: "DM Sans"
                        }}>
                        <div>
                        <CalendarMonthIcon style={{
                            margin:-5
                        }}/>
                        </div>
                        <div style={{
                            marginLeft:'2px'
                        }}>
                        Start date
                        </div>
                        </div>
                        <div style={{
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans',
                            fontWeight:'bold'
                        }}>
                            {new Date(job.startDate).getDate()} {monthMap[new Date(job.startDate).getMonth()+1]} {new Date(job.startDate).getFullYear() %2000}
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        
                    }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            lineHeight: '1.75rem',
                            letterSpacing: '-.02em',
                            fontWeight: '500',
                            color: '#9eaab7',
                            fontFamily: "DM Sans"
                        }}>
                        <div>
                        <TagIcon style={{
                            margin:-5
                        }}/>
                        </div>
                        <div style={{
                            marginLeft:'2px'
                        }}>
                        Openings
                        </div>
                        </div>
                        <div style={{
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans',
                            fontWeight:'bold'
                        }}>
                            {job.openings}
                        </div>
                    </div>
                </div>
                {/* {End of Job details div} */}

                {/* {Start of job description div, skills box consiting of two divs} */}

                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        marginTop:'10px',
                        border:'2px solid black',
                        padding:'10px'
                    }}> 

                    {/* Start of job desc div */}
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            border:'2px solid red',
                            width:'100%',
                            padding:'10px'
                        }}>
                        <div style={{
                            marginTop:'10px',
                            border:'2px solid green',
                        }}>
                            Job requirements
                        </div>
                        <div style={{
                            marginTop:'5px',
                            border:'2px solid green',
                        }}>
                            fsdsdsfadfsfsdsdfsfsdfsdfsfdsfsdfsfsdfsdfsdfsdfsdfsfsdffafsdfsdfsfsdfsdfsdfsdf
                        </div>
                        <div style={{
                            marginTop:'10px',
                            border:'2px solid green',
                        }}>
                            Job responsibilities
                        </div >
                        <div style={{
                            marginTop:'5px',
                            border:'2px solid green',
                        }}>
                            fsdsdsfadfsfsdsdfsfsdfsdfsfdsfsdfsfsdfsdfsdfsdfsdfsfsdffafsdfsdfsfsdfsdfsdfsdf
                        </div>
                        <div style={{
                            marginTop:'10px',
                            border:'2px solid green',
                        }}>
                            Hiring process
                        </div>
                        <div style={{
                            marginTop:'5px',
                            border:'2px solid green',
                        }}>
                            fsdsdsfadfsfsdsdfsfsdfsdfsfdsfsdfsfsdfsdfsdfsdfsdfsfsdffafsdfsdfsfsdfsdfsdfsdf
                        </div>
                    
                        </div>
                        {/* End of job desc div */}
                        {/* Start of skills div */}
                        
                        
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            border:'2px solid black',
                            marginRight:'10px',
                            marginLeft:'auto'
                        }}>
                        <div>
                            Skills required
                        </div>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                        }}>
                    {
                    
                    job.skillsRequired.map((skill) =>
                        (
                        <div>
                        <div  style={{
                        background:'#d5d5d5',
                        color: '#566474',
                        borderRadius:'20px',
                        width:'fit-content',
                        padding:'4.5px 10px',
                        fontWeight:'400',
                        display:'flex',
                        flexDirection:'row',
                        fontFamily: "DM Sans",
                        marginRight:'5px'
                    }}>
                             <div>
                                {skill}
                            </div>
                            </div>
                        </div>
                        ))
                }
                
                        </div>
                        </div>
                        {/* End of skills div */}
                        
                </div>
                {/* Start of about company div */}

                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        border:'2px solid black',
                        marginTop:'10px'
                    }}>
                    <div>
                        About company
                    </div>
                    <div>
                        Microsoft
                    </div>
                    <div>
                        Profile
                    </div>
                    <div>
                        fsdfsafsdfsdfsfafsdfsafsadfsafdsfsdf
                    </div>

                    </div>
    
                {/* End of about company div */}
                
            </div>
       </div>
       </div>
        </>
    )
}
export default DetailedJob