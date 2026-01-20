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
import moment from 'moment'
import '../../css/detailedJob.css'
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


const DetailedJob = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {account}=useContext(DataContext);
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
          <CompanySidebar/>
            <div style={{
                display:'flex',
                width:'100%',
                justifyContent:'center',
            }}>
                <div className="maincontainer">

                {/* {Start of main details of job div} */}
                <div className="maindetailscontainer">
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    padding:'5px',
                    // border:'2px solid green'
                }}>
                    <div className="jobType">
                    {jobState.jobTitle}{jobState.jobType === 'Internship'?' internship':''}
                    </div>

                    <div className="jobMode">
                    {jobState.location.includes('remote') || jobState.location.toLowerCase().includes('home') ? 'Work From Home':'In-Office'}

                    </div>
                </div>

                <div className="namecompany">
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
                    
                    {/* <div style={{
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
                    
                }}>Apply Now</div>
                    </div> */}
                    

                </div>

                

                </div>
                {/* {End of main details of job div} */}


                {/* {Start of Job details div} */}
                <div className="jobdetailscontainer">
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        paddingRight:'5px',
                        
                        
                    }}>
                        <div className="detail-title">
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
                        <div className="detail-value">
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
                        <div className="detail-title">
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
                        <div className="detail-value">
                            {jobState.duration}
                        </div>
                    </div>:
                    <div></div>
                    }
                    
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        
                    }}>
                        <div className="detail-title">
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
                        <div className="detail-value">
                            {jobState.workHours}
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        
                    }}>
                        <div className="detail-title">
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
                        <div className="detail-value">
                            {new Date(jobState.startDate).getDate()} {monthMap[new Date(jobState.startDate).getMonth()+1]} {new Date(jobState.startDate).getFullYear() %2000}
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        
                    }}>
                        <div className="detail-title">
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

                        
                        <div className="detail-value">
                            {jobState.openings}
                        </div>
                    </div>

                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        
                    }}>
                        <div className="detail-title">
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

                        
                        <div className="detail-value">
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
                        <div className="otherdetailcontainer">
                        <div className="other-detail-title">
                            Job requirements
                        </div>
                        <div className="other-detail-value">
                            {jobState.jobRequirements}
                        </div>
                        <div className="other-detail-title">
                            Job responsibilities
                        </div >
                        <div className="other-detail-value">
                            {jobState.responsibilities}
                        </div>
                        <div className="other-detail-title">
                            Hiring process
                        </div>
                        <div className="other-detail-value">
                            {jobState.hiringProcess}
                        </div>
                    
                        </div>
                        {/* End of job desc div */}
                        {/* Start of skills div */}
                        
                        
                        <div className="sidecontainercontainer">
                        <div className="side-container-title">
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
                        <div className="skill">
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
export default DetailedJob