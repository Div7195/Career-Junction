import Job from "./Job"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utility functions/util"
import AspirantSidebar from "../sidebar/AspirantSidebar"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Button} from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { TextField } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import skills from "../../constants/skills"
const ExploreJobs = () => {
    const jobFilterInitial = {
        jobType:'',
        minSalary:'',
        sortByDate:'',
        location:'',
        sortBySalary:'',
        skillsRequired:[]
    }
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const [jobs, setJobs] = useState({})
    const [jobFilter, setJobFilter] = useState(jobFilterInitial)
    const handleOptionClick = (e) => {
        setJobFilter({...jobFilter, skillsRequired:[...jobFilter.skillsRequired, e.target.value]});
        console.log(jobFilter)
    }
    const handleDeleteSkill = (skill) => {
        setJobFilter({...jobFilter, skillsRequired:jobFilter.skillsRequired.filter((e)=>{
            if(e !== skill) return e;
        })});
        console.log(jobFilter)
    }
    const handleTextFieldsChange = (e) => {
        setJobFilter({...jobFilter, [e.target.name]: e.target.value});
        console.log(jobFilter)
    }
    const handleRadioJobType = (e) => {
        setJobFilter({...jobFilter, jobType:e.target.value });
        console.log(jobFilter)
    }
    const handleRadioSortDate = (e) => {
        setJobFilter({...jobFilter, sortByDate:e.target.value });
        console.log(jobFilter)
    }
    const handleRadioSortSalary = (e) => {
        setJobFilter({...jobFilter, sortBySalary:e.target.value });
        console.log(jobFilter)
    }
    useEffect(() => {
        const myFunction = async() => {
        const url = `http://localhost:8000/getAllJobs`;
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
        
        myFunction()
    }, [])

    
    
    

    return(
        <>
        <div style={{
            display:'flex',
            flexDirection:'row'
          }}>
          <AspirantSidebar/>
          
        <div style={{
            width:'100%',
            display:'flex',

            
            
            
        }}>
        <div style={{
            display:'flex',
            flexDirection:'column',
           flexBasis:'70%'
        }}>

        {
            jobs.objArrayOfJobs && jobs.objArrayOfJobs.length > 0 ? jobs.objArrayOfJobs.map((job) => (
                        <Job  job = {job}

                        />
            ))
            :
            console.log('no data to show')
        }
        
        </div>
            
            <div style={{
                display:'flex',
                flexDirection:'column',
                flexBasis:'30%',
                marginLeft:'20px',
                fontFamily:'DM Sans'

            }}>

                <div style={{
                    fontSize:'20px',
                    display:'flex',
                    flexDirection:'row',
                    marginTop:'5px'
                }}>
                <div>
                Jobs Filter
                </div>
                <div style={{
                    marginRight:'5px',
                    marginLeft:'auto',
                    
                    fontSize:'16px',
                    fontFamily:'DM Sans',
                    backgroundColor:'#142683',
                    borderRadius:'5px',
                    fontWeight:700,
                    cursor:'pointer',
                    padding: '4px 4px 4px 4px',
                    color:'white'
                }}>Apply Filter</div>
                <div style={{
                    marginRight:'5px',
                    marginLeft:'auto',
                    
                    fontSize:'16px',
                    fontFamily:'DM Sans',
                    backgroundColor:'#142683',
                    borderRadius:'5px',
                    fontWeight:700,
                    cursor:'pointer',
                    padding: '4px 4px 4px 4px',
                    color:'white'
                }}
                onClick={() => {setJobFilter(jobFilterInitial)}}
                >
                
                Reset</div>

                </div>
                <div style={{
                    marginTop:'5px'
                }}>
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Job type</FormLabel>
                    <RadioGroup
                    onChange={(e) => {
                                            handleRadioJobType(e);
                                        }}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="Internship" control={<Radio checked = {jobFilter.jobType === 'Internship'?true:false}/>} label="Internship" />
                        <FormControlLabel value="Fulltime" control={<Radio checked = {jobFilter.jobType === 'Fulltime'?true:false} />} label="Fulltime" />
                        
                        
                    </RadioGroup>
                    </FormControl>
                </div>
                <div style={{
                    marginTop:'5px'
                }}>
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Sort by Salary</FormLabel>
                    <RadioGroup
                    onChange={(e) => {
                                            handleRadioSortSalary(e);
                                        }}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="Old To New" control={<Radio checked = {jobFilter.sortBySalary === 'Old To New'?true:false} />} label="Old To New" />
                        <FormControlLabel value="New To Old" control={<Radio checked = {jobFilter.sortBySalary === 'New To Old'?true:false} />} label="New To Old" />
                        
                        
                    </RadioGroup>
                    </FormControl>
                </div>

                <div style={{
                    marginTop:'5px'
                }}>
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Sort by date</FormLabel>
                    <RadioGroup
                    onChange={(e) => {
                                            handleRadioSortDate(e);
                                        }}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="Ascending" control={<Radio checked = {jobFilter.sortByDate === 'Ascending'?true:false} />} label="Ascending" />
                        <FormControlLabel value="Descending" control={<Radio checked = {jobFilter.sortByDate === 'Descending'?true:false}/>} label="Descending" />
                        
                        
                    </RadioGroup>
                    </FormControl>
                </div>


                <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'5px'
            }}>
                <div style={{
                    color:'black'
                }}>Min Salary{"(in Rs)"}
                    
                </div>

                <div>
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        name="minSalary"
                        value={jobFilter.minSalary}
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        variant="filled"
                        
                        />
                </div>
            </div>

            

                <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'5px'
            }}>
                <div style={{
                    color:'black'
                }}>Preferred Location
                    
                </div>

                <div>
                    <TextField
                        id="filled-multiline-flexible"
                        name="location"
                        label="Multiline"
                        
                        value={jobFilter.location}
                        onChange={(e) => {handleTextFieldsChange(e)}}
                        variant="filled"
                        
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
                    Preferred Skills
                </div>

                <div>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        onChange={(e) => {
                            handleOptionClick(e);
                        }}
                        value={jobFilter.skillsRequired[jobFilter.skillsRequired.length-1]}
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
                    
                    jobFilter.skillsRequired.map((skill) =>
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

                <div>

                </div>


            </div>

            
        </div>
        </div>
        </>
    )
    
}
export default ExploreJobs