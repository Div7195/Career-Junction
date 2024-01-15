
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getAccessToken } from '../../utility functions/util.js';
import { DataContext } from '../../context/DataProvider.jsx';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { useContext } from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import skills from '../../constants/skills.js';
import { Link } from 'react-router-dom';

const ProfileProject = ({aspirant, onUpdate}) =>{
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const projectObjInitial = {
        projectTitle:'',
        repoLink:'',
        liveLink:'',
        startDate:'',
        finishDate:'',
        aboutProject:'',
        projectSkills:[],
        _id:''
    }
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [tempProject, setTempProject] = useState(projectObjInitial)
    const handleClickOpen = () => {
        setTempProject(projectObjInitial)
        setOpen(true);
    };
    const handleClickOpen2 = (project) => {
        setTempProject(project)
        setOpen2(true);
    };

    const handleClose = () => {
        setTempProject(projectObjInitial)
        setOpen(false);
  };
  const handleClose2 = () => {
    setTempProject(projectObjInitial)
    setOpen2(false);
};
  const handleStartDateChange = (e) => {
        
    setTempProject({...tempProject, startDate:e.$d});
    
}
const handleFinishDateChange = (e) => {
    
    setTempProject({...tempProject, finishDate:e.$d});
}

const handleSkillSelect = (e) => {
    setTempProject({...tempProject, projectSkills:[...tempProject.projectSkills, e.target.value]});
}
const handleDeleteSkill = (skill) => {
    setTempProject({...tempProject, projectSkills:tempProject.projectSkills.filter((e)=>{
        if(e !== skill) return e;
    })});
}

const addNewProjectApi = async(field)=> {
    
    let tempArray = aspirant.projects;
    
    tempArray.push(field);
    const settings = {
        method: "POST",
        body: JSON.stringify({
            projects:tempArray
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'authorization' : getAccessToken()
        }
        }
        try {
            console.log(settings.body)
            const fetchResponse = await fetch(`https://career-junction.vercel.app/updateAspirantProfile?aspirantAccountId=${account.id}`, settings);
            const response = await fetchResponse.json();
            setTempProject(projectObjInitial)
            onUpdate(response)
            handleClose()
        } catch (e) {
            setTempProject(projectObjInitial)
            return e;
        }    
}

const editProjectApi = async(field, id) => {
    let tempArray = aspirant.projects;
    for(let i = 0;i<tempArray.length;i++){
        if(tempArray[i]._id === id){
            tempArray[i] = field
            break;
        }
    }

    const settings = {
        method: "POST",
        body: JSON.stringify({
            projects:tempArray
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'authorization' : getAccessToken()
        }
        }
        try {
           
            const fetchResponse = await fetch(`https://career-junction.vercel.app/updateAspirantProfile?aspirantAccountId=${account.id}`, settings);
            const response = await fetchResponse.json();
            setTempProject(projectObjInitial)
            onUpdate(response)
            console.log(aspirant)
            handleClose2()
        } catch (e) {
            setTempProject(projectObjInitial)
            return e;
        }    
}
const deleteProjectApi = () => {

}



    return(
        <>
            <div style={{
                display:'flex',
                flexDirection:'column'
            }}>
                {/* Start of add new top view */}
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    fontSize:'16px',
                    marginTop:'15px',
                    fontFamily:'DM Sans',
                    
                }}>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    fontSize:'16px',
                    fontWeight: 700,
                    fontFamily:'DM Sans'
                }}>
                <div>
                Add Project Details
                </div>
                <div style={{
                    color:'#566474',
                    
                }}>
                Projects that you have worked on before
                </div>
                
                </div>
                {
                    account.role !== 'company'?
                    <div onClick={handleClickOpen} style={{
                    marginLeft:'auto',
                    marginRight:'0px',
                    borderRadius:'5px',
                    cursor:'pointer',
                    border: '1px solid #142683',
                    padding: '4px',
                    color:'#142683'
                }}>
                <AddCircleOutlineIcon/> Add New
                </div>

                    :
                    <div></div>
                    }
                

                {/* Start of form dialog form */}

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogContent>
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        flexDirection:'column',
                        marginTop:'10px',
                        fontSize:'15px'}}>

                        {/* Start of school name */}
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginTop:'15px'
                    }}>
                        <div style={{
                            color:'black'
                        }}>
                            Project Title
                        </div>

                        <div>
                            <TextField
                                name="projectTitle"
                                value={tempProject.projectTitle}
                                onChange={(e) => {
                                    setTempProject({...tempProject, [e.target.name]: e.target.value})
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="filled"
                                    style={{width:500}}
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
                            About Project
                        </div>

                        <div>
                            <TextField
                                name="aboutProject"
                                value={tempProject.aboutProject}
                                onChange={(e) => {
                                    setTempProject({...tempProject, [e.target.name]: e.target.value})
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="filled"
                                    style={{width:500}}
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
                    Skills
                </div>

                <div style={{
                    width:500,
                }}>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        onChange={(e) => {
                            handleSkillSelect(e)
                        }}
                        value={tempProject.projectSkills[tempProject.projectSkills.length-1]}
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
                    
                    flexWrap:'wrap'
                }}>

                        

                {
                    
                    tempProject.projectSkills.map((skill) =>
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
                            <CloseIcon  onClick={() => {handleDeleteSkill(skill)}} style={{
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
                            Repository Link
                        </div>

                        <div>
                            <TextField
                                name="repoLink"
                                value={tempProject.repoLink}
                                onChange={(e) => {
                                    setTempProject({...tempProject, [e.target.name]: e.target.value})
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="filled"
                                    style={{width:500}}
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
                            Live Link
                        </div>

                        <div>
                            <TextField
                                name="liveLink"
                                value={tempProject.liveLink}
                                onChange={(e) => {
                                    setTempProject({...tempProject, [e.target.name]: e.target.value})
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="filled"
                                    style={{width:500}}
                                />
                        </div>
                </div>
                {/* Start of date of education */}

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
                <DatePicker  label="Select start date" value={dayjs(tempProject.startDate)}
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
                    End Date
                </div>

                <div>
                
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                <DatePicker  label="Select end date" value={dayjs(tempProject.finishDate)}
          onChange={(e) => {handleFinishDateChange(e)}}/>
                </DemoContainer>
                </LocalizationProvider>
                    
                </div>
            </div>
                    
                {/* End of date of education */}
                </div>
                {/* End of school name */}
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>{addNewProjectApi(tempProject)}}>Save</Button>
                    </DialogActions>
             </Dialog>
                {/* End of dialog form */}
                
                </div>
                {/* End of add new top view */}

                {/* Start of list of educations */}
                <div style={{
                            display:'flex',
                            flexDirection:'column',
                            fontFamily:'DM Sans'
                        }}>
                {
                    aspirant.projects &&  aspirant.projects.length > 0 ? aspirant.projects.map((project) => (
                        
                        
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            border:'1px solid #ebf0f5',
                            padding: '30px 30px 30px 45px',
                            marginTop:'10px'
                        }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',

                        }}>
                            <div style={{
                                color:'black',
                                fontSize:'20px',
                            }}>
                            {project.projectTitle}
                            </div>

                            {
                            account.role !== 'company'?
                            <div style={{
                            marginLeft:'auto',
                            marginRight:'0px',
                            borderRadius:'5px',
                            border: '1px solid #142683',
                            
                            padding: '4px 4px 4px 4px',
                            color:'#142683',
                            height:'fit-content',
                            cursor:'pointer',
                        }}
                        onClick={() => {
                            
                            handleClickOpen2(project);
                        }}
                        >
                            <EditOutlinedIcon/> Edit
                            </div>

                            :
                            <div></div>
                            }
                            


                        </div>

                    <Dialog open={open2} onClose={handleClose2}>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogContent>
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        flexDirection:'column',
                        marginTop:'10px',
                        fontSize:'15px'}}>

                        {/* Start of school name */}
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginTop:'15px'
                    }}>
                        <div style={{
                            color:'black'
                        }}>
                            Project Title
                        </div>

                        <div>
                            <TextField
                                name="projectTitle"
                                value={tempProject.projectTitle}
                                onChange={(e) => {
                                    setTempProject({...tempProject, [e.target.name]: e.target.value})
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="filled"
                                    style={{width:500}}
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
                            About Project
                        </div>

                        <div>
                            <TextField
                                name="aboutProject"
                                value={tempProject.aboutProject}
                                onChange={(e) => {
                                    setTempProject({...tempProject, [e.target.name]: e.target.value})
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="filled"
                                    style={{width:500}}
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
                    width:500,
                }}>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        onChange={(e) => {
                            handleSkillSelect(e)
                        }}
                        value={tempProject.projectSkills[tempProject.projectSkills.length-1]}
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
                    
                    flexWrap:'wrap'
                }}>

                        

                {
                    
                    tempProject.projectSkills.map((skill) =>
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
                            <CloseIcon  onClick={() => {handleDeleteSkill(skill)}} style={{
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
                            Repository Link
                        </div>

                        <div>
                            <TextField
                                name="repoLink"
                                value={tempProject.repoLink}
                                onChange={(e) => {
                                    setTempProject({...tempProject, [e.target.name]: e.target.value})
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="filled"
                                    style={{width:500}}
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
                            Live Link
                        </div>

                        <div>
                            <TextField
                                name="liveLink"
                                value={tempProject.liveLink}
                                onChange={(e) => {
                                    setTempProject({...tempProject, [e.target.name]: e.target.value})
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="filled"
                                    style={{width:500}}
                                />
                        </div>
                </div>
                {/* Start of date of education */}

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
                <DatePicker  label="Select start date" value={dayjs(tempProject.startDate)}
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
                    End Date
                </div>

                <div>
                
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                <DatePicker  label="Select end date" value={dayjs(tempProject.finishDate)}
          onChange={(e) => {handleFinishDateChange(e)}}/>
                </DemoContainer>
                </LocalizationProvider>
                    
                </div>
            </div>
                    
                {/* End of date of education */}
                </div>
                {/* End of school name */}
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>{editProjectApi(tempProject, tempProject._id)}}>Save</Button>
                    </DialogActions>
             </Dialog>

                <div style={{
                            color: '#566474',
                            fontSize:'16px',
                            marginTop: '5px',
                            fontWeight: 400,
                            width:750
                }}>
                    {project.aboutProject}

                </div>

                <Link>
                    <div  style={{
                                color: '#445ee2',
                                fontSize:'14px',
                                marginTop: '5px',
                                fontWeight:700
                    }}
                    onClick = {() => {
                        window.open(project.repoLink,'_blank' )
                    }}
                    >
                        Source Link

                    </div>
                </Link>
                <Link>
                    <div  style={{
                                color: 'red',
                                fontSize:'14px',
                                marginTop: '5px',
                                fontWeight:700
                    }}
                    onClick = {() => {
                        window.open(project.liveLink,'_blank' )
                    }}
                    >
                        Live Link

                    </div>
                </Link>

                <div style={{
                            display:'flex',
                            flexDirection:'row',
                            flexWrap:'wrap'
                        }}>
                    {
                    
                    project.projectSkills.map((skill) =>
                        (
                        <div>
                        <div  style={{
                        background:'#f0f0f0',
                        color: '#566474',
                        borderRadius:'20px',
                        width:'fit-content',
                        padding:'4.5px 10px',
                        display:'flex',
                        flexDirection:'row',
                        fontFamily: "DM Sans",
                        marginRight:'5px',
                        marginTop:'10px',
                        fontSize:'16px'
                    }}>
                             <div>
                                {skill}
                            </div>
                            </div>
                        </div>
                        ))
                }
                
                        </div>
                            

                        </div>
                   ))
                   :
                   console.log('No Project details')
                }
                </div>
            </div>
        </>
    )
}
export default ProfileProject