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
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
const CreateNewJob = () => {
    const [skillsChosen, setSkills] = useState([]);
    console.log(skillsChosen)
    const handleOptionClick = (e) => {
        setSkills([...skillsChosen, e.target.value ])
    }
    const handleDeleteSkill = (skill) => {
        setSkills(skillsChosen.filter((e)=>{
            if(e !== skill) return e;
        }))
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
                    Job Type
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
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
                    Stipend
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
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
                    Salary
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
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
                    Duration
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
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
                    Location
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
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
                    Start Date
                </div>

                <div>
                
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                <DatePicker label="Basic date picker" />
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
                        label="Multiline"
                        multiline
                        maxRows={4}
                        variant="filled"
                        style={{width:400}}
                        />
                </div>
            </div>
            


        </div>
            
        
            
        
        </div>
    );
}
export default CreateNewJob