import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TagIcon from '@mui/icons-material/Tag';
const job = {
    companyId: '3123123',
    companyName:'Microsoft',
    companyBased:'Bangalore',
    jobTitle :'Frontend Developer',
    jobType :'internship',
    stipend :40000,
    salary :50000,
    duration :'4 months',
    location :'Remote',
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

const Job = () =>{

return(
    <div>
        <div style={{
            display:'flex',
            flexDirection:'column',
            padding:'10px',
            
            marginBottom:'20px',
            border: '2px solid #ebf0f5',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            boxSizing: 'border-box',
            borderRadius: '10px 10px 10px 10px',

        }}>
            <div style={{
                display:'flex',
                flexDirection:'column',
                
                marginBottom:'10px'

            }}>
                <div style={{
                    
                    fontSize:'20px',
                    color:'#1e272e',
                    fontFamily: "DM Sans",
                    fontWeight: 'bold'
                    
                }}>
                    Mobile app developer internship
                </div>
                <div style={{
                    fontSize:'10px',
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: '1.75rem',
                    letterSpacing: '-.02em',
                    color: '#9eaab7',
                    fontFamily: "DM Sans"
                }}>
                    Microsoft | Bangalore
                </div>

            </div>
            <div style={{
                display:'flex',
                flexDirection:'row',
                
                marginBottom:'10px'
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
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    
                    marginBottom:'10px'
                }}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        paddingRight:'5px',
                        marginRight:'50px'
                        
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
                        Stipend per month
                        </div>
                        </div>
                        <div style={{
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans',
                            fontWeight:'bold'
                        }}>
                            Rs. 9K-12K
                        </div>
                        
                        
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginRight:'50px'
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
                            3 months
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginRight:'50px'
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
                            7-8 hours/day
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginRight:'50px'
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
                            13 jan 24
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginRight:'50px'
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
                            1
                        </div>
                    </div>
                </div>

                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    width:'100%',
                    marginBottom:'10px'
                }}>
                    <div style={{
                        
                            fontSize: '14px',
                            color: '#445ee2',
                            display: 'flex',
                            alignItems: 'center',
                            lineHeight: '1.1rem',
                            minHeight: '28px',
                    }}>
                    Apply by 25 December 2023 • Posted 4h ago
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        marginRight:'10px',
                        marginLeft:'auto'
                    }}>

                    
                        <div style={{
                                border: '1px solid #ebf0f5',
                                borderRadius: '5px',
                                display:'flex',
                                justifyContent:'center',
                                color: '#566474',
                                fontSize:'16px',
                                fontFamily:'DM Sans',
                                alignItems:'center',
                                cursor:'pointer',
                                height:'44px'
                        }}>
                        View Details
                        </div>
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
                        }}>
                        Apply Now
                        </div>
                    </div>
                </div>


        </div>
    </div>
)
}
export default Job