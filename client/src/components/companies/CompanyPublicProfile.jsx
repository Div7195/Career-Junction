import { useState, useEffect, useContext } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utility functions/util"
import AspirantSidebar from "../sidebar/AspirantSidebar"
import { Avatar } from "@mui/material"
import Job from "../jobs/Job"
import CompanySidebar from "../sidebar/CompanySidebar"
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
            const url = `http://localhost:8000/getCompanyProfile?companyAccountId=${companyAccountId}`;
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
            const url = `http://localhost:8000/getJobs?companyAccountId=${companyAccountId}`;
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
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    flexWrap:'wrap',
                    flexBasis:'95%',
                    padding:'5px'
                }}>

                        <div>
                            <div style={{ position: 'relative', height: '240px', background: '#4d2d57', marginBottom: '20px', borderRadius:'5px' }}>
                            <div style={{
                                fontSize:'35px',
                                fontFamily:'DM Sans',
                                color:'white',
                                margin:'5px'
                            }}>
                                 {company.companyName}
                            </div>
                            <div style={{
                                fontSize:'15px',
                                fontFamily:'DM Sans',
                                color:'white',
                                margin:'5px'
                            }}>
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

                <div  style={{
                    fontSize:'25px',
                    fontFamily:"DM Sans",
                    fontWeight:500,
                    background:'rgb(32, 18, 50)',
                    padding:'10px',
                    width:'100%',
                    marginTop:'10px',
                    borderRadius:'5px',
                    color:'white',

                }}>
                    Overview
                </div>

                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        width:'100%'
                    }}>
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        minWidth:'30%',
                        background:'aliceblue',
                        padding:'10px',
                        borderRadius:'5px',
                        marginTop:"5px"
                    }}>
                    
                    <div style={{
                        fontFamily:'DM Sans',
                        fontSize:'24px',
                        fontWeight:'500',
                        color:'black'
                    }}>
                        Location Based
                    </div>
                    <div style={{
                        marginRight:'0px',
                        marginLeft:'auto',
                        fontFamily:'DM Sans',
                        fontSize:'24px',
                        fontWeight:'400',
                        color:'blue'
                    }}>
                        {company.locationBased}
                    </div>

                    </div>

                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        minWidth:'30%',
                        background:'aliceblue',
                        padding:'10px',
                        borderRadius:'5px',
                        marginTop:"5px"
                    }}>
                    
                    <div style={{
                        fontFamily:'DM Sans',
                        fontSize:'24px',
                        fontWeight:'500',
                        color:'black'
                    }}>
                        Company Size
                    </div>
                    <div style={{
                        marginRight:'0px',
                        marginLeft:'auto',
                        fontFamily:'DM Sans',
                        fontSize:'24px',
                        fontWeight:'400',
                        color:'blue'
                    }}>
                        {company.companySize}
                    </div>

                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        minWidth:'30%',
                        background:'aliceblue',
                        padding:'10px',
                        borderRadius:'5px',
                        marginTop:"5px"
                    }}>
                    
                    <div style={{
                        fontFamily:'DM Sans',
                        fontSize:'24px',
                        fontWeight:'500',
                        color:'black'
                    }}>
                        Company Type
                    </div>
                    <div style={{
                        marginRight:'0px',
                        marginLeft:'auto',
                        fontFamily:'DM Sans',
                        fontSize:'24px',
                        fontWeight:'400',
                        color:'blue'
                    }}>
                        {company.companyType}
                    </div>

                    </div>

                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        minWidth:'30%',
                        background:'aliceblue',
                        padding:'10px',
                        borderRadius:'5px',
                        marginTop:"5px"
                    }}>
                    
                    <div style={{
                        fontFamily:'DM Sans',
                        fontSize:'24px',
                        fontWeight:'500',
                        color:'black'
                    }}>
                        Industry Type
                    </div>
                    <div style={{
                        marginRight:'0px',
                        marginLeft:'auto',
                        fontFamily:'DM Sans',
                        fontSize:'24px',
                        fontWeight:'400',
                        color:'blue'
                    }}>
                        {company.industryType}
                    </div>

                    </div>


                    <div  style={{
                    fontSize:'25px',
                    fontFamily:"DM Sans",
                    fontWeight:500,
                    background:'rgb(32, 18, 50)',
                    padding:'10px',
                    width:'100%',
                    marginTop:'10px',
                    borderRadius:'5px',
                    color:'white',

                }}>
                    About company
                </div>
                <div style={{
                        fontSize:'16px',
                        minWidth:'30%',
                        background:'aliceblue',
                        padding:'10px',
                        fontFamily:'DM Sans',
                        fontWeight:'400',
                        borderRadius:'5px',
                        marginTop:"5px"
                    }}>
                    {company.aboutCompany}
                    </div>

                    </div>
                    <div  style={{
                    fontSize:'25px',
                    fontFamily:"DM Sans",
                    fontWeight:500,
                    background:'rgb(32, 18, 50)',
                    padding:'10px',
                    width:'100%',
                    marginTop:'10px',
                    borderRadius:'5px',
                    color:'white',

                }}>
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