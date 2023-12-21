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
import { useContext } from "react";
import { DataContext } from '../../context/DataProvider.jsx';
import dayjs from 'dayjs';
import { getAccessToken } from "../../utility functions/util.js";
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect } from "react";
import CompanySidebar from "../sidebar/CompanySidebar.jsx";
const EditJob = () => {
    
    const navigate = useNavigate();
    const {id} = useParams();
    const {account}=useContext(DataContext);
    const jobInitialValues = {
        companyId:account.id,
        jobTitle:'',
        jobType:'Internship',
        lowerSalary:0,
        upperSalary:0,
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
    const {setAccount} = useContext(DataContext);
    const [jobState, setJob] = useState(jobInitialValues)
    console.log(jobState)
    const handleOptionClick = (e) => {
        setJob({...jobState, skillsRequired:[...jobState.skillsRequired, e.target.value]});
    }
    const handleDeleteSkill = (skill) => {
        setJob({...jobState, skillsRequired:jobState.skillsRequired.filter((e)=>{
            if(e !== skill) return e;
        })});
    }
    const handleTextFieldsChange = (e) => {
        setJob({...jobState, [e.target.name]: e.target.value});
    }
    const handleRadio = (e) => {
        setJob({...jobState, jobType:e.target.value });
    }
    const handleStartDateChange = (e) => {
        
        setJob({...jobState, startDate:e.$d});
        
    }
    const handleDeadlineChange = (e) => {
        
        setJob({...jobState, applyDeadlineDate:e.$d});
    }
    
    const updateJob = async() =>{
        console.log(jobState)
        const settings = {
         method: "POST",
         body: JSON.stringify(jobState),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
             'authorization' : getAccessToken()
         }
         }
         try {
             console.log(settings.body)
             const fetchResponse = await fetch(`http://localhost:8000/updateJob?jobId=${id}`, settings);
             const response = await fetchResponse.json();
            
             
         } catch (e) {
             
             return e;
         }    
     }
     

     useEffect(() => {
        const myFunction = async() => {
        const url = `http://localhost:8000/getSingleJob?jobId=${id}`;
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
            
            } catch (e) {
            console.log(e);
            }
    
        }
        
        myFunction()
    }, [])
     
    
    
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
      <FormLabel id="demo-row-radio-buttons-group-label">Job type</FormLabel>
      <RadioGroup
      onChange={(e) => {
                            handleRadio(e);
                        }}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Internship" control={<Radio checked = {jobState.jobType === 'Internship'?true:false} />} label="Internship" />
        <FormControlLabel value="Fulltime" control={<Radio checked = {jobState.jobType === 'Fulltime'?true:false} />} label="Fulltime" />
        
        
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
                    Job Title
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        name="jobTitle"
                        value={jobState.jobTitle}
                        onChange={(e) => {handleTextFieldsChange(e)}}
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
                }}>Lower Range of
                    {
                        jobState.jobType === 'Internship' ? ' Stipend': ' Job offer'
                    }
                </div>

                <div>
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        name="lowerSalary"
                        value={jobState.lowerSalary}
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        variant="filled"
                        style={{width:800}}
                        />
                </div>
            </div>
            <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px'
            }}>Upper Range of
                <div style={{
                    color:'black'
                }}>
                    {
                        jobState.jobType === 'Internship' ? ' Stipend': ' Job offer'
                    }
                </div>

                <div>
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        name="upperSalary"
                        value={jobState.upperSalary}
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        variant="filled"
                        style={{width:800}}
                        />
                </div>
            </div>
            {
                jobState.jobType === 'Internship' ?
                <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px'
            }}>
                <div style={{
                    color:'black'
                }}>
                    Duration
                </div>

                <div>
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        name="duration"
                        value={jobState.duration}
                        onChange={(e) => {handleTextFieldsChange(e)}}
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
                    Location
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        name="location"
                        value={jobState.location}
                        onChange={(e) => {handleTextFieldsChange(e)}}
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
                    Openings
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        name="openings"
                        label="Multiline"
                        value={jobState.openings}
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        
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
                    Start Date
                </div>

                <div>
                
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                <DatePicker  label="Basic date picker" value={dayjs(jobState.startDate)}
          onChange={(e) => {handleStartDateChange(e)}}/>
                </DemoContainer>
                </LocalizationProvider>
                    
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
                    Application deadline date
                </div>

                <div>
                
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                <DatePicker  label="Basic date picker" value={dayjs(jobState.applyDeadlineDate)} onChange={(e) => {handleDeadlineChange(e)}}/>
                </DemoContainer>
                </LocalizationProvider>
                    
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
                    Skills Required
                </div>

                <div>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        onChange={(e) => {
                            handleOptionClick(e);
                        }}
                        value={jobState.skillsRequired[jobState.skillsRequired.length-1]}
                        defaultValue={30}
                        inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}
                    >
                    {
                        skills.map((skill) =>
                        (
                            <option  value={skill.name}>{skill.name}</option>
                        ))
                    
                    }
                        
                    </NativeSelect>

                </FormControl>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    width:400,
                    flexWrap:'wrap'
                }}>

                        

                {
                    
                    jobState.skillsRequired.map((skill) =>
                        (
                        <div>
                        <div  style={{
                        background:'black',
                        color:'white',
                        borderRadius:'20px',
                        width:'fit-content',
                        padding:'5px',
                        display:'flex',
                        flexDirection:'row'
                    }}>
                            <div>
                                {skill}
                            </div>
                            <div>
                            <CloseIcon onClick={() => {handleDeleteSkill(skill)}}  style={{
                                cursor:'pointer'
                            }}/>
                            </div>
                            </div>
                        </div>
                        ))
                }
                    
                        
                   
                </div>
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
                    Work Hours
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        value={jobState.workHours}
                        name="workHours"
                        onChange={(e) => {handleTextFieldsChange(e)}}
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
                    Job requiredments
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        value={jobState.jobRequirements}
                        name="jobRequirements"
                        onChange={(e) => {handleTextFieldsChange(e)}}
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
                    Responsibilities
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        value={jobState.responsibilities}
                        name="responsibilities"
                        onChange={(e) => {handleTextFieldsChange(e)}}
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
                    Hiring Process
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        value={jobState.hiringProcess}
                        name="hiringProcess"
                        onChange={(e) => {handleTextFieldsChange(e)}}
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
                <Button onClick={() => {
                    updateJob()
                }} style={{
                    
                    background:'#131c30',
                    color:'rgb(0, 236, 255)',
                    fontWeight: 'bold',
                }}  variant="contained">Update opening</Button>
            </div>
            


        </div>
            
        
            
        
        </div>
        </div>
        </>
    );
}
export default EditJob