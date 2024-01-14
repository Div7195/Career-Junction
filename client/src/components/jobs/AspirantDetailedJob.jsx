import CompanySidebar from "../sidebar/CompanySidebar"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TagIcon from '@mui/icons-material/Tag';
import monthMap from "../../constants/monthMap";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";
import { getAccessToken } from "../../utility functions/util.js";
import AspirantSidebar from "../sidebar/AspirantSidebar.jsx";
import moment from 'moment'
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
    skillsRequired :['React', 'Javascript', 'HTML', 'Angular','React', 'Javascript', 'HTML', 'Angular'],
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


const AspirantDetailedJob = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {account}=useContext(DataContext);
    const [appliedOrNot, setAppliedOrNot] = useState('Apply Now')
    const jobInitialValues = {
        companyId:'',
        jobTitle:'',
        jobType:'Internship',
        salary:'',
        openings:'',
        duration:'',
        location:'',
        startDate:'',
        applyDeadlineDate:'',
        jobCreateDate:'',
        workHours:'',
        jobRequirements:'',
        responsibilities:'',
        hiringProcess:'',
        skillsRequired:[],
        appliedAspirantsId:[],
    }

    const companyIntialValues = {
        companyName :'',
        locationBased:'',
        aboutCompany:'',
        companyAccountId:''
    }
    const {setAccount} = useContext(DataContext);
    const [jobState, setJob] = useState(jobInitialValues)
    const [companyState, setCompanyState] = useState(companyIntialValues)
    console.log(jobState)
    useEffect(() => {
        const myFunction = async() => {
        const url = `http://localhost:8000/getSingleJobAndCompany?jobId=${id}`;
        const settings = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization : getAccessToken()
        }
        };
        try {
            const fetchResponse = await fetch(url, settings);
            const response = await fetchResponse.json();
            
            console.log(response.jobObj)
            setJob(response.jobObj);
            setCompanyState({companyName:response.companyName, locationBased:response.locationBased, aboutCompany:response.aboutCompany, companyAccountId:jobState.companyId});
            } catch (e) {
            console.log(e);
            }
        }
        myFunction()
      
    }, [])
    const applyToJob = async() => {
        const settings = {
            method: "POST",
            body: JSON.stringify({
                jobId:job._id,
                aspirantAccountId:account.id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization' : getAccessToken()
            }
            }
            try {
                console.log(settings.body)
                const fetchResponse = await fetch(`http://localhost:8000/applyToJob`, settings);
                const response = await fetchResponse.json();
                if(response.msg === 'success job update'){
                    setAppliedOrNot('Applied')
                }
                
            } catch (e) {
                
                return e;
            } 
    }

    const jobPostTimeStamp = new Date(jobState.jobCreateDate);
    const currentTime = new Date();
    const timeDifference = moment(jobPostTimeStamp).from(currentTime);
    console.log(timeDifference);



    return(
        <>
        <div style={{
            display:'flex',
            flexDirection:'row'
          }}>
          <AspirantSidebar/>
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
                    // border:'2px solid red',
                    padding:'10px'
                }}>

                {/* {Start of main details of job div} */}
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    border: '2px solid #ebf0f5',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
                    boxSizing: 'border-box',
                    borderRadius: '5px 5px 5px 5px',
                    padding:'10px'
                }}>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    padding:'5px',
                    // border:'2px solid green'
                }}>
                    <div style={{
                            fontWeight: 'bold',
                            color: '#222f3e',
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize:'18px'
                    }}>
                    {jobState.jobTitle}{jobState.jobType === 'Internship'?' internship':''}
                    </div>

                    <div style={{
                        marginRight:'0px',
                        marginLeft:'auto',
                        borderRadius: '5px',
                        color: '#445ee2',
                        backgroundColor: '#dcddde',
                        fontFamily: 'DM Sans, sans-serif',
                        padding: '5px 10px'
                    }}>
                    {jobState.location.includes('remote') || jobState.location.toLowerCase().includes('home') ? 'Work From Home':'In-Office'}

                    </div>
                </div>

                <div style={{
                    // border:'2px solid blue',
                    padding:'5px',
                    color: '#566474',
                    fontSize:'16px',
                    fontFamily: 'DM Sans, sans-serif',
                }}>
                {companyState.companyName} | {companyState.locationBased}
                </div>

                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    padding:'5px',
                    // border:'2px solid orange'
                }}>
                    <div style={{
                        // border:'2px solid green',
                        color: '#445ee2',
                        fontFamily: 'DM Sans, sans-serif',
                    }}>
                        Apply by {new Date(jobState.applyDeadlineDate).getDate()} {monthMap[new Date(jobState.applyDeadlineDate).getMonth()+1]} {new Date(jobState.applyDeadlineDate).getFullYear()} • Posted {timeDifference} 
                    </div>
                    
                    {

                    !jobState.appliedAspirantsId.includes(account.id)?
                    <div style={{
                        marginRight:'10px',
                        marginLeft:'auto'
                    }}>
                    <div style={{
                    
                    marginLeft:'10px',
                    fontSize:'16px',
                    fontFamily: 'DM Sans, sans-serif',
                    backgroundColor:'#142683',
                    borderRadius:'5px',
                    fontWeight:700,
                    cursor:'pointer',
                    padding: '8px 20px 8px 16px',
                    color:'white'
                    
                }}
                onClick={() =>{applyToJob()}}
                >
                
                {appliedOrNot}</div>
                    </div>
                    :
                    <div style={{
                        color:'black',
                        fontSize:'16px',
                        fontFamily:'DM Sans',
                        fontWeight:'500',
                        padding:'5px',
                        border:'3px solid black',
                        borderRadius:'5px',
                        marginLeft:'auto',
                        marginRight:'10px',
                    }}>
                        Applied
                    </div>
                }

                </div>

                

                </div>
                {/* {End of main details of job div} */}


                {/* {Start of Job details div} */}
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    marginBottom:'10px',
                    marginTop:'30px',
                    padding:'10px',
                    border: '2px solid #ebf0f5',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
                    boxSizing: 'border-box',
                    borderRadius: '5px 5px 5px 5px',
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
                            jobState.jobType === 'Internship'? 'Salary per month' : 'Job offer'
                        }
                        
                        </div>
                        </div>
                        <div style={{
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans',
                            fontWeight:'bold'
                        }}>
                            {
                            
                                jobState.jobType === 'Internship'? 
                            <>
                            Rs {jobState.lowerSalary/1000.0}K - {jobState.upperSalary/1000.0}K 
                            </>
                            : 
                            <>
                            Rs {jobState.lowerSalary/100000.0}LPA - {jobState.upperSalary/100000.0}LPA
                            </>
                            
                        }
                        </div>
                        
                        
                    </div>
                    {
                        jobState.jobType === 'Internship' ?
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
                            {jobState.duration}
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
                            {jobState.workHours}
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
                            {new Date(jobState.startDate).getDate()} {monthMap[new Date(jobState.startDate).getMonth()+1]} {new Date(jobState.startDate).getFullYear() %2000}
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
                            {jobState.openings}
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
                        <LocationOnIcon style={{
                            margin:-5
                        }}/>
                        </div>
                        <div style={{
                            marginLeft:'2px'
                        }}>
                        Office location
                        </div>
                        </div>

                        
                        <div style={{
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans',
                            fontWeight:'bold'
                        }}>
                            {jobState.location}
                        </div>
                    </div>
                </div>
                {/* {End of Job details div} */}

                {/* {Start of job description div, skills box consiting of two divs} */}

                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        marginTop:'30px',
                        
                        
                    }}> 

                    {/* Start of job desc div */}
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            border: '2px solid #ebf0f5',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
                            boxSizing: 'border-box',
                            borderRadius: '5px 5px 5px 5px',
                            
                            width:'100%',
                            padding:'10px'
                        }}>
                        <div style={{
                            marginTop:'10px',
                            // border:'2px solid green',
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize:'18px',
                            textDecoration:'underline',
                            fontWeight: 'bold',
                        }}>
                            Job requirements
                        </div>
                        <div style={{
                            marginTop:'5px',
                            // border:'2px solid green',
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans'
                        }}>
                            {jobState.jobRequirements}
                        </div>
                        <div style={{
                            marginTop:'10px',
                            // border:'2px solid green',
                            fontSize:'18px',
                            textDecoration:'underline',
                            fontWeight: 'bold',
                            fontFamily: 'DM Sans, sans-serif',
                        }}>
                            Job responsibilities
                        </div >
                        <div style={{
                            marginTop:'5px',
                            // border:'2px solid green',
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans'
                        }}>
                            {jobState.responsibilities}
                        </div>
                        <div style={{
                            marginTop:'10px',
                            // border:'2px solid green',
                            fontSize:'18px',
                            textDecoration:'underline',
                            fontWeight: 'bold',
                            fontFamily: 'DM Sans, sans-serif',
                        }}>
                            Hiring process
                        </div>
                        <div style={{
                            marginTop:'5px',
                            // border:'2px solid green',
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans'
                        }}>
                            {jobState.hiringProcess}
                        </div>
                    
                        </div>
                        {/* End of job desc div */}
                        {/* Start of skills div */}
                        
                        
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            border: '2px solid #ebf0f5',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
                            boxSizing: 'border-box',
                            borderRadius: '5px 5px 5px 5px',
                            marginRight:'0px',
                            marginLeft:'auto'
                        }}>
                        <div style={{
                            marginTop:'20px',
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize:'18px',
                            textDecoration:'underline',
                            fontWeight: 'bold',
                        }}>
                            Skills required
                        </div>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            flexWrap:'wrap'
                        }}>
                    {
                    
                    jobState.skillsRequired.map((skill) =>
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
                        marginRight:'5px',
                        marginTop:'10px'
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
                        border: '2px solid #ebf0f5',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
                        boxSizing: 'border-box',
                        borderRadius: '5px 5px 5px 5px',
                        marginTop:'30px'
                    }}>
                    <div style={{

                            fontSize:'18px',
                            textDecoration:'underline',
                            fontWeight: 'bold',
                            fontFamily: 'DM Sans, sans-serif',
                    }}>
                        About company
                    </div>
                    <div style={{
                    color: '#566474',
                    fontSize:'16px',
                    fontFamily: 'DM Sans, sans-serif',
                    }}>
                        {companyState.companyName}
                    </div>
                    <div style={{
                        color: '#445ee2',
                        fontFamily: 'DM Sans, sans-serif',
                        cursor:'pointer'
                    }}
                    onClick={() =>{
                        navigate(`/companypublic/${jobState.companyId}`)
                    }}
                    >
                        Profile
                    </div>
                    <div style={{
                        marginTop:'5px',
                            // border:'2px solid green',
                            color:'#566474',
                            fontSize:'16px',
                            fontFamily:'DM Sans'
                    }}>
                        {companyState.aboutCompany}
                    </div>

                    </div>
    
                {/* End of about company div */}
                
            </div>
       </div>
       </div>
        </>
    )
}
export default AspirantDetailedJob