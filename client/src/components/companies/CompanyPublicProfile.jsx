import { useState, useEffect, useContext } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utility functions/util"
import AspirantSidebar from "../sidebar/AspirantSidebar"
import { Avatar } from "@mui/material"
import Job from "../jobs/Job"
import CompanySidebar from "../sidebar/CompanySidebar"
import '../../css/companies.css'
const CompanyPublicProfile = () => {
    const navigate = useNavigate();
    const {companyAccountId} = useParams();
    const {account}=useContext(DataContext);
    const companyObj = {
        companyAccountId:account.id,
        companyName:'',
        locationBased:'',
        companySize:'',
        industryType:'',
        companyType:'',
        companyImage:'',
        aboutCompany:'',
        introOfCompany:'',
        companyImage:'',
        jobsList:[],
        employeesList:[],
        status:''
    }

    const [company, setCompany] = useState(companyObj)
    useEffect( () => {
        const myFunction = async () => {
            const url = `https://career-junction.vercel.app/getCompanyProfile?companyAccountId=${companyAccountId}`;
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
                setCompany(response);
                
                } catch (e) {
                console.log(e);
                }
        };
        const mySecondFunction = async() => {
            const url = `https://career-junction.vercel.app/getJobs?companyAccountId=${companyAccountId}`;
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
                setJobs(response);
                
                } catch (e) {
                console.log(e);
                }
        
            }
        myFunction();
        mySecondFunction()
    },[]);
    const [jobs, setJobs] = useState({})
    return(
        <>
            <div style={{
            display:'flex',
            flexDirection:'row'
          }}>
          {account.role === 'aspirant'?<AspirantSidebar/>:<CompanySidebar/>}
            <div style={{
                display:'flex',
                width:'100%',
                justifyContent:'center',
            }}>
                <div className="company-public-pfp-container" >

                        <div>
                            <div className="company-public-pfp-container-div">
                            <div className="ppfp-name">
                                 {company.companyName}
                            </div>
                            <div className="ppfg-intro">
                                 {company.introOfCompany}
                            </div>
                                <div style={{ position: 'absolute', bottom: '0', left: '0', padding: '10px' }}>
                                    <Avatar
                                    alt={company.companyName}
                                    src={company.companyImage ? company.companyImage : 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'}
                                    sx={{ width: 150, height: 150, border: '3px solid #fff', position: 'absolute', transform: 'translate(-0%, -100%)' }}
                                    />
                                </div>
                            </div>
                        </div>

                <div  className="overview">
                    Overview
                </div>

                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        width:'100%'
                    }}>
                    <div className="container-parent">
                    
                    <div className="heading-container">
                        Location Based
                    </div>
                    <div className="value-container">
                        {company.locationBased}
                    </div>

                    </div>

                    <div className="container-parent">
                    
                    <div className="heading-container">
                        Company Size
                    </div>
                    <div className="value-container">
                        {company.companySize}
                    </div>

                    </div>
                    <div className="container-parent">
                    
                    <div className="heading-container">
                        Company Type
                    </div>
                    <div className="value-container">
                        {company.companyType}
                    </div>

                    </div>

                    <div className="container-parent">
                    
                    <div className="heading-container">
                        Industry Type
                    </div>
                    <div className="value-container">
                        {company.industryType}
                    </div>

                    </div>


                    <div className="big-text">
                    About company
                </div>
                <div className="about-text-content">
                    {company.aboutCompany}
                    </div>

                    </div>
                    <div  className="big-text">
                    Openings
                </div>
                    <div style={{
                    display:'flex',
                    flexDirection:'column',
                    marginTop:'5px'
        }}>

        {
            jobs.objArrayOfJobs && jobs.objArrayOfJobs.length > 0 ? jobs.objArrayOfJobs.map(job => (
                        <Job  job = {job}
                            locationBased={jobs.locationBased}
                            companyName={jobs.companyName}
                            saved = {false}
                        />
            ))
            :
            console.log('no data to show')
        }
        
        </div>


                </div>
                </div>
                </div>
        </>
    )
}
export default CompanyPublicProfile