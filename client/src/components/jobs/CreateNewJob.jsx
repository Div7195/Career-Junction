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
import { DataContext } from '../../context/DataProvider';
import dayjs from 'dayjs';
const CreateNewJob = () => {
    const [skillsChosen, setSkills] = useState([]);
    const {account}=useContext(DataContext);
    const jobInitialValues = {
        companyId:account.companyId,
        jobTitle:'',
        jobType:'',
        salary:'',
        openings:'',
        duration:'',
        location:'',
        startDate:'',
        applyDeadlineDate:'',
        jobCreateDate:new Date(),
        workHours:'',
        jobRequirements:'',
        responsibilities:'',
        hiringProcess:'',
        skillsRequired:[],
    }
    const {setAccount} = useContext(DataContext);
    const [jobState, setJob] = useState(jobInitialValues)
    const [jobType, setJobType] = useState('Internship')
    const [dateValue, setDate] = useState(dayjs('2022-04-17'));
    console.log(skillsChosen)
    const handleOptionClick = (e) => {
        setSkills([...skillsChosen, e.target.value ])
        setJob({...jobState, skillsRequired:skillsChosen});
    }
    const handleDeleteSkill = (skill) => {
        setSkills(skillsChosen.filter((e)=>{
            if(e !== skill) return e;
        }))
    }
    const handleTextFieldsChange = (e) => {
        setJob({...jobState, [e.target.name]: e.target.value});
    }
    const handleRadio = (e) => {
        setJobType(e.target.value);
        setJob({...jobState, jobType:e.target.value });
    }
    
    return(
        
        <div style={{
            marginTop:'64px',
            display:'flex',
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
        <FormControlLabel value="Internship" control={<Radio  />} label="Internship" />
        <FormControlLabel value="Fulltime" control={<Radio />} label="Fulltime" />
        
        
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
                        value={jobState.jobTitle}
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                            style={{width:400}}
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
                    {
                        jobType === 'Internship' ? 'Stipend': 'Job offer'
                    }
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        value={jobState.jobType}
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                        style={{width:400}}
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
                    Duration
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        value={jobState.duration}
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                        style={{width:400}}
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
                        value={jobState.location}
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                        style={{width:400}}
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
                        label="Multiline"
                        value={jobState.openings}
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        
                        variant="filled"
                        style={{width:400}}
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
                <DatePicker label="Basic date picker" value={dateValue}
          onChange={(newValue) => {setDate(newValue)}}/>{console.log(dateValue.$d)}
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
                <DatePicker onChange={(e)=>{console.log(e.target.value)}} label="Basic date picker" />
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
                    
                    skillsChosen.map((skill) =>
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
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                        style={{width:400}}
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
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                        style={{width:400}}
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
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                        style={{width:400}}
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
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                        style={{width:400}}
                        />
                </div>
            </div>
            <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px'
            }}>
                <Button style={{
                    background:'#131c30',
                    color:'rgb(0, 236, 255)',
                    fontWeight: 'bold',
                }}  variant="contained">Create new opening</Button>
            </div>
            


        </div>
            
        
            
        
        </div>
    );
}
export default CreateNewJob