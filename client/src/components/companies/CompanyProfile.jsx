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
const CompanyProfile = () => {
    const [jobType, setJobType] = useState('Internship')
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
    const handleRadio = (e) => {
        setJobType(e.target.value);
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
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
      onChange={(e) => {
                            handleRadio(e);
                        }}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Hiring" control={<Radio  />} label="Hiring" />
        <FormControlLabel value="Freeze" control={<Radio />} label="Freeze" />
        
        
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
                        id="filled-multiline-flexible"
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
                    Location Based
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
                    Industry Type
                </div>

                <div>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        onChange={(e) => {
                            
                        }}
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
                            
                        }}
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
                    About Company
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
                <Button style={{
                    background:'#131c30',
                    color:'rgb(0, 236, 255)',
                    fontWeight: 'bold',
                }}  variant="contained">Save changes</Button>
            </div>
            
            
            
            


        </div>
            
        
            
        
        </div>
    );
}
export default CompanyProfile