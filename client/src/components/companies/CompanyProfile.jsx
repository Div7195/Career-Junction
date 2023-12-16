import { TextField } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import skills from "../../constants/skills.js";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Button} from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import companyTypes from "../../constants/companyTypes.js";
import industries from "../../constants/industries.js";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useContext } from "react";
import { DataContext } from '../../context/DataProvider';
import companySize from "../../constants/companySize.js";
import { getAccessToken } from "../../utility functions/util.js";
import { useEffect } from "react";
import CompanySidebar from "../sidebar/CompanySidebar.jsx";

const CompanyProfile = () => {
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const companyObj = {
        companyAccountId:account.id,
        companyName:'',
        locationBased:'',
        companySize:'',
        industryType:'',
        companyType:'',
        aboutCompany:'',
        introOfCompany:'',
        jobsList:[],
        employeesList:[],
        status:''
    }
    const [jobType, setJobType] = useState('Internship')
    const [skillsChosen, setSkills] = useState([]);
    
    const [company, setCompany] = useState(companyObj)
    
    const handleIndustryOptionClick = (e) => {
        setCompany({...company, industryType:e.target.value })
    }
    const handleCompanyTypeOptionClick = (e) => {
        setCompany({...company, companyType:e.target.value })
    }
    const handleCompanySizeOptionClick = (e) => {
        setCompany({...company, companySize:e.target.value })
    }
    const handleTextFieldsChange = (e) => {
        setCompany({...company, [e.target.name]:e.target.value})
    }
    const handleDeleteSkill = (skill) => {
        setSkills(skillsChosen.filter((e)=>{
            if(e !== skill) return e;
        }))
    }
    const handleRadio = (e) => {
        setCompany({...company, status:e.target.value });
    }
    const updateCompanyProfile = async() =>{
        const settings = {
         method: "POST",
         body: JSON.stringify(company),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
             authorization : getAccessToken()
         }
         }
         try {
             console.log(settings.body)
             const fetchResponse = await fetch(`http://localhost:8000/updateCompanyProfile`, settings);
             const response = await fetchResponse.json();
         } catch (e) {  
             return e;
         }    
     }
     

     useEffect( () => {
        const myFunction = async () => {
            const url = `http://localhost:8000/getCompanyProfile?companyAccountId=${company.companyAccountId}`;
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
        myFunction();
    },[]);
        
   



    
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
            fontSize:'20px',
            color:'black'

        }}>
        
        
            <div style={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                marginTop:'10px',
                fontSize:'15px'
                
            }}>
            <div>   
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
      onChange={(e) => {handleRadio(e);}}             
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Hiring" control={<Radio checked={company.status==='Hiring'?true:false}  />} label="Hiring" />
        <FormControlLabel value="Freeze" control={<Radio checked={company.status==='Freeze'?true:false}/>} label="Freeze" />
        
        
      </RadioGroup>
    </FormControl>
        </div>
            <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px'
            }}>
                <div style={{
                    color:'black'
                }}>
                    Company Name
                </div>

                <div>
                    <TextField
                        name="companyName"
                        value={company.companyName}
                        onChange={(e) => {
                            handleTextFieldsChange(e);
                        }}
                        id="filled-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                            style={{width:800}}
                        />
                </div>
            </div>

            {
                jobType === 'Internship' ?
                <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px'
            }}>
                <div style={{
                    color:'black'
                }}>
                    Location Based
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        name="locationBased"
                        value={company.locationBased}
                        onChange={(e) => {
                            handleTextFieldsChange(e);
                        }}
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                        style={{width:800}}
                        />
                </div>
            </div>
            :
            <div></div>
            }
            
            <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px'
            }}>
                <div style={{
                    color:'black'
                }}>
                    Company Size
                </div>

                <div>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        onChange={(e) => {
                            handleCompanySizeOptionClick(e);
                        }}
                        defaultValue={30}
                        value={company.companySize}
                        inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}
                    >
                    {
                        companySize.map((size) =>
                        (
                            <option  value={size}>{size}</option>
                        ))
                    
                    }
                        
                    </NativeSelect>

                </FormControl>
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
                    Industry Type
                </div>

                <div>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        onChange={(e) => {
                            handleIndustryOptionClick(e);
                        }}
                        value={company.industryType}
                        defaultValue={30}
                        inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}
                    >
                    {
                        industries.map((industry) =>
                        (
                            <option  value={industry}>{industry}</option>
                        ))
                    
                    }
                        
                    </NativeSelect>

                </FormControl>
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
                    Company Type
                </div>

                <div>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        onChange={(e) => {
                            handleCompanyTypeOptionClick(e);
                        }}
                        value={company.companyType}
                        defaultValue={30}
                        inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}
                    >
                    {
                        companyTypes.map((company) =>
                        (
                            <option  value={company}>{company}</option>
                        ))
                    
                    }
                        
                    </NativeSelect>

                </FormControl>
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
                    Intro of company
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        name="introOfCompany"
                        value={company.introOfCompany}
                        onChange={(e) => {
                            handleTextFieldsChange(e);
                        }}
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
                    About Company
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        name="aboutCompany"
                        value={company.aboutCompany}
                        onChange={(e) => {
                            handleTextFieldsChange(e);
                        }}
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
                <Button onClick={() => {updateCompanyProfile()}} style={{
                    background:'#131c30',
                    color:'rgb(0, 236, 255)',
                    fontWeight: 'bold',
                }}  variant="contained">Save changes</Button>
            </div>
            
            
            
            


        </div>
            
        
            
        </div>
        </div>
        </>
    );
}
export default CompanyProfile