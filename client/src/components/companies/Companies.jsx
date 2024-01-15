import { useState, useEffect, useContext } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utility functions/util"
import AspirantSidebar from "../sidebar/AspirantSidebar"
import CompanySidebar from "../sidebar/CompanySidebar"
import { TextField } from "@mui/material"
const Companies = () => {
    const navigate = useNavigate();
    const {companyAccountId} = useParams();
    const {account}=useContext(DataContext);
    const [companies, setCompanies] = useState([])

    useEffect( () => {
        const myFunction = async () => {
            const url = `https://career-junction.vercel.app/getAllCompanies?searchInput=`;
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
        const url = `https://career-junction.vercel.app/getAllCompanies?searchInput=${text}`;
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
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        border:'2px solid #ebe1f0',
                        borderRadius:'5px',
                        padding:'5px',
                        cursor:'pointer',
                        background:'#c7dff5',
                        marginTop:'10px',
                    }}
                    onClick={() => {navigate(`/companypublic/${e.companyAccountId}`)}}
                    >

                     <div style={{
                    display: 'block',
                    minWidth: '40px',
                    borderRadius:'25px',
                    background:'#cda8ff',
                    width:'40px',
                    height:'40px',
                    
                   
                }}>
                    <img src={e.companyImage && e.companyImage !== ""?e.companyImage:'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'}alt="Company Image" style={{
                   
                    display: 'block',     
                    width: '100%',
                    minWidth: '100%',
                    height: '100%',
                    minHeight: '100%',
                    borderWidth: '0px',
                    outline: 'none' ,
                    borderRadius:'60px',
                    objectFit:'cover'
                }} />
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
                <div style={{
                    fontSize:'16px',
                    fontFamily:'DM Sans',
                    fontWeight:'800',
                    color:'#566474',
                    borderRadius:'5px',
                    padding:'5px',
                    background:"#dad4f0"
                }}>
                {e.companyName}

                </div>


                </div>

                <div style={{
                    fontFamily:'DM Sans',
                    fontSize:'14px',
                    color:'black'
                }}>
                        {
                            e.industryType
                        }
                        
                </div>
                <div style={{
                    fontFamily:'DM Sans',
                    fontSize:'14px',
                    color:'black'
                }}>
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