import { useState, useEffect, useContext } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utility functions/util"
import AspirantSidebar from "../sidebar/AspirantSidebar"
import CompanySidebar from "../sidebar/CompanySidebar"
import { TextField } from "@mui/material"
import '../../css/companies.css'
const Companies = () => {
    const navigate = useNavigate();
    const {companyAccountId} = useParams();
    const {account}=useContext(DataContext);
    const [companies, setCompanies] = useState([])

    useEffect( () => {
        const myFunction = async () => {
            const url = `http://localhost:8000/getAllCompanies?searchInput=`;
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
                setCompanies(response.data);
                
                } catch (e) {
                console.log(e);
                }
        };
        
        myFunction();
    },[]);

    const searchApi = async(text) => {
        const url = `http://localhost:8000/getAllCompanies?searchInput=${text}`;
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
                setCompanies(response.data);
                
                } catch (e) {
                console.log(e);
                }
    }
    return(
    <>
        <div style={{
            display:'flex',
            flexDirection:'row'
          }}>
          {account.role === 'aspirant'? <AspirantSidebar/> : <CompanySidebar/>}
            <div style={{
                display:'flex',
                width:'100%',
                justifyContent:'center',
            }}>
            
            <div style={{
            display:'flex',
            flexDirection:'column',
            flexBasis:'40%',
        }}>
        <div style={{
                    margin:'auto'
                }}>
                <TextField
                onChange = {(e) => {searchApi(e.target.value)}}
                inputProps={{
                    style: {color:'black',fontSize:'16px',fontWeight:'400', borderRadius:'35px', border:'3px solid #c1cdd8', padding:'17px', background:'aliceblue' },
                }}
                placeholder="Search companies..."
                 id="outlined-basic" 
                 variant="standard" 
                 InputProps={{
                    disableUnderline: true,
                    style:{
                        width:600,
                        background:''
                        }
                    }}
                
                 />
                </div>

            {
                companies && companies.length > 0 ?
                companies.map(e => (
                    <div className="company-container"
                    onClick={() => {navigate(`/companypublic/${e.companyAccountId}`)}}
                    >
                     <div className="company-container-child">
                    <img src={e.companyImage && e.companyImage !== ""?e.companyImage:'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'}alt="Company Image" className="company-image" />
                </div>


                    <div style={{
                    display:'flex',
                    flexDirection:'column',
                    marginLeft:'5px',
                    flexGrow:2
                }}
                >
                <div style={{
                    display:'flex',
                    flexDirection:"row",
                    
                }}>
                <div className="company-name" >
                {e.companyName}

                </div>


                </div>

                <div className="some-text">
                        {
                            e.industryType
                        }
                        
                </div>
                <div className="some-text">
                        {
                            `${e.jobsPosted} jobs posted`
                        }
                        
                </div>
                </div>
                </div>
                ))
                :
                <></>
            }



        </div>

            </div>

        </div>

    </>
    )
    
}
export default Companies;