import CompanySidebar from "../sidebar/CompanySidebar"
import { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Button} from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import { getAccessToken } from "../../utility functions/util";
import CloseIcon from '@mui/icons-material/Close';
import jobDomains from "../../constants/domains";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProfileEducation from "./ProfileEducation";
import ProfileProject from "./ProfileProject";
import ProfilePositions from "./ProfilePositions";
import ProfileAchievements from "./ProfileAchievements";
import ProfileExperience from "./ProfileExperience";
import ProfileCertifications from "./ProfileCertifications";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import '../../css/aspirantProfile.css'

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }



const CompanyAspirantProfile = () => {
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const aspirantObj = {
        aspirantAccountId:account.id,
                aspirantName:'',
                aspirantEmail:'',
                aspirantLocation:'',
                aspirantChats:[],
                appliedJobs:[],
                savedJobs:[],
                domains:[],
                education:[],
                projects:[],
                positionsOfResp:[],
                workExperiences:[],
                achivements:[],
                certifications:[],
                applications:[],
                linkedinLink:'',
                githubLink:'',
                status:''
    }
    const [aspirant, setAspirant] = useState(aspirantObj)
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDomainSelect = (e) => {
        setAspirant({...aspirant, domains:[...aspirant.domains, e.target.value]});
    }
    const handleDeleteDomain = (domain) => {
        setAspirant({...aspirant, domains:aspirant.domains.filter((e)=>{
            if(e !== domain) return e;
        })});
    }
    const handleTextFieldsChange = (e) => {
        setAspirant({...aspirant, [e.target.name]: e.target.value});
    }

    const updateProfile = async() => {
        
        const settings = {
         method: "POST",
         body: JSON.stringify(aspirant),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
             'authorization' : getAccessToken()
         }
         }
         try {
             console.log(settings.body)
             const fetchResponse = await fetch(`http://localhost:8000/updateAspirantProfile?aspirantAccountId=${id}`, settings);
             const response = await fetchResponse.json();
            
             
         } catch (e) {
             
             return e;
         }    
    }

    useEffect(() => {
      const myFunction = async() => {
        const url = `http://localhost:8000/getAspirantProfile?aspirantAccountId=${id}`;
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
            setAspirant(response);
            
            } catch (e) {
            console.log(e);
            }
      }
      myFunction();
    }, [])
    

     return(
        <>
            <div style={{
            display:'flex',
            flexDirection:'row'
          }}>
                <CompanySidebar/>
                <div className="main-container">

         <div className="sub-container">
                <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px'
            }}>
                <div style={{
                    color:'black'
                }}>
                    Aspirant Name
                </div>

                <div>
                    <TextField
                        name="aspirantName"
                        value={aspirant.aspirantName}
                        
                        id="filled-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                            style={{width:800}}
                        />
                </div>
            </div>

            <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px'
            }}>
                <div style={{
                    color:'black'
                }}>
                    Domains
                </div>

                <div style={{
                    width:800,
                }}>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        
                        value={aspirant.domains[aspirant.domains.length-1]}
                        defaultValue={30}
                        inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}
                    >
                    {
                        jobDomains.map((domain) =>
                        (
                            <option  value={domain}>{domain}</option>
                        ))
                    
                    }
                        
                    </NativeSelect>

                </FormControl>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    
                    flexWrap:'wrap'
                }}>

                        

                {
                    
                    aspirant.domains.map((domain) =>
                        (
                        <div>
                        <div  className="domain">
                            <div>
                                {domain}
                            </div>
                            {
                            account.role !== 'company'?
                            <div>
                            <CloseIcon  onClick={() => {handleDeleteDomain(domain)}} style={{
                                cursor:'pointer'
                            }}/>
                            </div>

                            :
                            <div></div>
                            }
                            
                            </div>
                        </div>
                        ))
                }
                    
                        
                   
                </div>
                </div>
            </div>
            {
                account.role !== 'company'?
                <div className="save-changes-button"
                // onClick={()=>{updateProfile()}}
                >Save Changes</div>

                :
                <div></div>
                }
            

            <Box style = {{
                width:'100%',
                marginTop:'20px'
            }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Education" {...a11yProps(0)} />
                        <Tab label="Projects" {...a11yProps(1)} />
                        <Tab label="Position Of Responsibilities" {...a11yProps(2)} />
                        <Tab label="Work Experience" {...a11yProps(3)} />
                        <Tab label="Achievements" {...a11yProps(4)} />
                        <Tab label="Certifications" {...a11yProps(5)} />
                        </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <ProfileEducation 
                        aspirant={aspirant}
                        onUpdate={(state) => {setAspirant(state)}}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <ProfileProject
                        aspirant={aspirant}
                        onUpdate={(state) => {setAspirant(state)}}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <ProfilePositions 
                        aspirant={aspirant}
                        onUpdate={(state) => {setAspirant(state)}}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={3}>
                    <ProfileExperience 
                        aspirant={aspirant}
                        onUpdate={(state) => {setAspirant(state)}}
                    />
                </CustomTabPanel>


                <CustomTabPanel value={value} index={4}>
                    <ProfileAchievements 
                        aspirant={aspirant}
                        onUpdate={(state) => {setAspirant(state)}}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={5}>
                    <ProfileCertifications 
                        aspirant={aspirant}
                        onUpdate={(state) => {setAspirant(state)}}
                    />
                </CustomTabPanel>
            </Box>
                </div>
                </div>             
          </div>
        </>
     )
}
export default CompanyAspirantProfile