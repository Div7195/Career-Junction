import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TagIcon from '@mui/icons-material/Tag';
import { DataContext } from '../../context/DataProvider';
import { useState } from 'react';
import { useContext } from 'react';
import monthMap from '../../constants/monthMap.js';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAccessToken } from '../../utility functions/util.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import moment from  'moment'
import '../../css/job.css'
// const job = {
//     companyId: '3123123',
//     companyName:'Microsoft',
//     companyBased:'Bangalore',
//     jobTitle :'Frontend Developer',
//     jobType :'Internship',
    
//     salary :'Rs. 9K-12K',
//     duration :'3 months',
//     location :'Remote',
//     openings:10,
//     startDate :12/11/23,
//     skillsRequired :['React', 'Javascript', 'HTML', 'Angular'],
//     applyDeadlineDate :14/4/23,
//     jobCreateDate :11/3/22,
//     workHours :'7-8 hours',
//     reponsibilities :`Algorithm Development: Collaborate with the Computer Vision team to design, implement, and optimize state-of-the-art computer vision algorithms for 3D scanning applications.
//     Image Processing: Work on enhancing image quality, feature extraction, and pattern recognition to improve the overall performance of the 3D scanning system.
//     Documentation: Create comprehensive documentation for implemented algorithms, procedures, and system configurations
//     `,
//     hiringProcess:`Shortlisted candidates will get a short assignment
//     Candidates with decent submissions will be interviewed on Zoom
//     Selected candidates will be intimated via email/telephone` ,
//     jobRequirements:`Currently pursuing or recently completed a degree in Computer Science, Computer Engineering, or a related field.
//     Strong programming skills, with expertise in Python. Familiarity with C++ is a plus.
//     Proficiency in computer vision libraries, especially OpenCV and Open3D.
//     Familiarity with Point Cloud Library (PCL) for advanced 3D processing is a plus.
//     Desirable experience with CUDA for parallel computing tasks.`,
// }

const Job = ({job, saved, locationBased, companyName}) =>{
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const [aspirant, setAspirant] = useState({})
    const [company, setCompany] = useState({})
    const [savedBool, setSaved] = useState(saved)
    const [appliedOrNot, setAppliedOrNot] = useState('Apply Now')
    const navigate = useNavigate();
    const deleteJob = async(jobId) => {
        const url = `http://localhost:8000/deleteJob?jobId=${jobId}`;
        const settings = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            authorization : getAccessToken()
        }
        };
        try {
            const fetchResponse = await fetch(url, settings);
            const response = await fetchResponse.json();
            navigate('/youropenings')
            } catch (e) {
            console.log(e);
            }
    
        }

        
        

        const saveJob = async() => {
            const settings = {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization' : getAccessToken()
                }
                }
                try {
                    console.log(settings.body)
                    const fetchResponse = await fetch(`http://localhost:8000/saveJobs?aspirantAccountId=${account.id}&jobId=${job._id}`, settings);
                    const response = await fetchResponse.json();
                    if(response.msg === 'success'){
                        setSaved(true)
                    }
                    
                } catch (e) {
                    
                    return e;
                } 
        }   

        const unsaveJob = async() => {
            const settings = {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization' : getAccessToken()
                }
                }
                try {
                    console.log(settings.body)
                    const fetchResponse = await fetch(`http://localhost:8000/unsaveJobs?aspirantAccountId=${account.id}&jobId=${job._id}`, settings);
                    const response = await fetchResponse.json();
                    if(response.msg === 'success'){
                        setSaved(false)
                    }
                    
                } catch (e) {
                    
                    return e;
                } 
        }  

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

const jobPostTimeStamp = new Date(job.jobCreateDate);
    const currentTime = new Date();
    const timeDifference = moment(jobPostTimeStamp).from(currentTime);
    console.log(timeDifference);

    
return(
    <div>
        <div className='fsadfdsfs'>
            <div style={{
                display:'flex',
                flexDirection:'row',

            }}>
            <div style={{
                display:'flex',
                flexDirection:'column',
                marginBottom:'10px'
            }}>
                <div className='job-title'>
                    
                        {job.jobTitle}{job.jobType === 'Internship'?' internship':''}

                    
                </div>
                <div className='name-company'
                onClick={() => {
                    navigate(`/companypublic/${job.companyId}`)
                }}
                >
                    {companyName !== ''?companyName:job.companyName} | {locationBased !== ''?locationBased:job.locationBased}
                </div>

            </div>
            <div style={{
                        marginRight:'10px',
                        marginLeft:'auto'
            }}
            
            >
           {
            account.role === 'aspirant' ?
            savedBool === true ? 
            <div style={{

            }}
            onClick={() => {unsaveJob()}}
            >
            <BookmarkIcon style={{
                cursor:'pointer'
            }}
            />
            </div>
            :
            job.appliedAspirantsId.includes(account.id)?
                    <div className='applied'>
                        Applied
                    </div>
                    :
                    <div style={{

                    }}
                    onClick={() => {saveJob()}}
                    >
                    <BookmarkBorderIcon 
                    style={{
                        
                        cursor:'pointer'
                    }}
                    />
                    </div>
            
            
            :
            <div className='side'>
            
            <Link to={`/job/${job._id}`} style={{textDecoration:'none' , color:'inherit'}}>
            <EditIcon style={{
                    cursor:'pointer',
                    
                    
                    marginRight:'10px'
                }}/>
        </Link>
                
                <DeleteIcon style={{
                    cursor:'pointer',
                    marginRight:'10px'
                }}
                onCLick = {() => {deleteJob(job._id)}}
                />
            </div>
           }
            

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
                        <div className='skill-job'>
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
                    <div className='detail-title-box'>
                        <div className='detail-title-heading'>
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
                        <div className='detail-title-value'>
                        
                        {
                            
                            job.jobType === 'Internship'? 
                            <>
                            Rs {job.lowerSalary/1000.0}K - {job.upperSalary/1000.0}K 
                            </>
                            : 
                            <>
                            Rs {job.lowerSalary/100000.0}LPA - {job.upperSalary/100000.0}LPA
                            </>
                            
                        }
                           
                        </div>
                        
                        
                    </div>
                    {
                        job.jobType === 'Internship' ?
                        <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginRight:'50px'
                    }}>
                        <div className='detail-title-heading'>
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
                        <div className='detail-title-value'>
                            {job.duration}
                        </div>
                    </div>:
                    <div></div>
                    }
                    
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginRight:'50px'
                    }}>
                        <div className='detail-title-heading'>
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
                        <div className='detail-title-value'>
                            {job.workHours}
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginRight:'50px'
                    }}>
                        <div className='detail-title-heading'>
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
                        <div className='detail-title-value'>
                            {new Date(job.startDate).getDate()} {monthMap[new Date(job.startDate).getMonth()+1]} {new Date(job.startDate).getFullYear() %2000}
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginRight:'50px'
                    }}>
                        <div className='detail-title-heading'>
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
                        <div className='detail-title-value'>
                            {job.openings}
                        </div>
                    </div>
                </div>

                <div className='bottom-box'>
                    <div className='apply-deadline'>
                    Apply by {new Date(job.applyDeadlineDate).getDate()} {monthMap[new Date(job.applyDeadlineDate).getMonth()+1]} {new Date(job.applyDeadlineDate).getFullYear()} • Posted {timeDifference} 
                    </div>
                    <div className='bottom-right-box'>

                    {
                        account.role === 'company'?
                        <>
                        <Link to={`/job/${job._id}/applicants`} style={{textDecoration:'none' , color:'inherit'}}>
                        <div className='view-applicants-button'>
                        
                        View Applicants
                        </div>
                        </Link>
                        <Link to={`/job/details/${job._id}`} style={{textDecoration:'none' , color:'inherit'}}>
                        <div className='view-details-button'>
                        
                        View Details
                        </div>
                        </Link>
                        </>
                        :
                        <>
                        <Link to={`/aspirant/job/details/${job._id}`} style={{textDecoration:'none' , color:'inherit'}}>
                        <div className='view-details-button'>
                        
                        View Details
                        </div>
                        </Link>
                        </>
                    }

                
                        {
                            account.role !== 'company'?
                            job.appliedAspirantsId.includes(account.id)?
                            <div className='view-messages-button'
                            onClick={() => {
                    navigate(`/company/job/${job._id}/messages/${account.id}/chatId/${job.chatId}`)
                }}
                            >
                               View Messages
                            </div>
                            :

                            <div className='apply-job-button'
                        onClick={() => {
                            applyToJob()
                        }}
                        >{appliedOrNot}</div>
                            :
                            <div></div>
                
                        }
                
                        
                        
                    </div>
                </div>


        </div>
    </div>
)
}
export default Job