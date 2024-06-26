
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

const ProfilePositions = ({aspirant, onUpdate}) =>{
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const positionObjInitial = {
        positionTitle:'',
        descriptionOfPosition:'',
        positionSkills:[],
        _id:''
    }
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [tempPosition, setTempPosition] = useState(positionObjInitial)
    const handleClickOpen = () => {
        setTempPosition(positionObjInitial)
        setOpen(true);
    };
    const handleClickOpen2 = (position) => {
        setTempPosition(position)
        setOpen2(true);
    };

    const handleClose = () => {
        setTempPosition(positionObjInitial)
        setOpen(false);
  };
  const handleClose2 = () => {
    setTempPosition(positionObjInitial)
    setOpen2(false);
};
  const handleStartDateChange = (e) => {
        
    setTempPosition({...tempPosition, startDate:e.$d});
    
}
const handleFinishDateChange = (e) => {
    
    setTempPosition({...tempPosition, finishDate:e.$d});
}

const handleSkillSelect = (e) => {
    setTempPosition({...tempPosition, positionSkills:[...tempPosition.positionSkills, e.target.value]});
}
const handleDeleteSkill = (skill) => {
    setTempPosition({...tempPosition, positionSkills:tempPosition.positionSkills.filter((e)=>{
        if(e !== skill) return e;
    })});
}

const addNewPositionApi = async(field)=> {
    
    let tempArray = aspirant.positionsOfResp;
    
    tempArray.push(field);
    const settings = {
        method: "POST",
        body: JSON.stringify({
            positionsOfResp:tempArray
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'authorization' : getAccessToken()
        }
        }
        try {
            console.log(settings.body)
            const fetchResponse = await fetch(`http://localhost:8000/updateAspirantProfile?aspirantAccountId=${account.id}`, settings);
            const response = await fetchResponse.json();
            setTempPosition(positionObjInitial)
            onUpdate(response)
            handleClose()
        } catch (e) {
            setTempPosition(positionObjInitial)
            return e;
        }    
}

const editPositionApi = async(field, id) => {
    let tempArray = aspirant.positionsOfResp;
    for(let i = 0;i<tempArray.length;i++){
        if(tempArray[i]._id === id){
            tempArray[i] = field
            break;
        }
    }

    const settings = {
        method: "POST",
        body: JSON.stringify({
            positionsOfResp:tempArray
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'authorization' : getAccessToken()
        }
        }
        try {
           
            const fetchResponse = await fetch(`http://localhost:8000/updateAspirantProfile?aspirantAccountId=${account.id}`, settings);
            const response = await fetchResponse.json();
            setTempPosition(positionObjInitial)
            onUpdate(response)
            console.log(aspirant)
            handleClose2()
        } catch (e) {
            setTempPosition(positionObjInitial)
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
                <div className='top'>
                <div className='top-sub-left'>
                <div>
                Add Position Details
                </div>
                <div style={{
                    color:'#566474',
                    
                }}>
                Resposibilties or extra academic activities that you have worked on
                </div>
                
                </div>
                {
                    account.role !== 'company'?
                    <div onClick={handleClickOpen} className='add-new'>
                <AddCircleOutlineIcon/> Add New
                </div>

                    :
                    <div></div>
                    }
                    

                {/* Start of form dialog form */}

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Position</DialogTitle>
                    <DialogContent>
                    <div className='dialog-container'>

                        {/* Start of school name */}
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginTop:'15px'
                    }}>
                        <div style={{
                            color:'black'
                        }}>
                            Position Title
                        </div>

                        <div>
                            <TextField
                                name="positionTitle"
                                value={tempPosition.positionTitle}
                                onChange={(e) => {
                                    setTempPosition({...tempPosition, [e.target.name]: e.target.value})
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
                            Description of position
                        </div>

                        <div>
                            <TextField
                                name="descriptionOfPosition"
                                value={tempPosition.descriptionOfPosition}
                                onChange={(e) => {
                                    setTempPosition({...tempPosition, [e.target.name]: e.target.value})
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
                        value={tempPosition.positionSkills[tempPosition.positionSkills.length-1]}
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
                    
                    tempPosition.positionSkills.map((skill) =>
                        (
                        <div>
                        <div  className='skill'>
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
                {/* Start of date of education */}
                    
                {/* End of date of education */}
                </div>
                {/* End of school name */}
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>{addNewPositionApi(tempPosition)}}>Save</Button>
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
                    aspirant.positionsOfResp &&  aspirant.positionsOfResp.length > 0 ? aspirant.positionsOfResp.map((position) => (
                        
                        
                        <div className='position-container'>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',

                        }}>
                            <div style={{
                                color:'black',
                                fontSize:'20px',
                            }}>
                            {position.positionTitle}
                            </div>

                            {
                            account.role !== 'company'?
                            <div className='edit'
                        onClick={() => {
                            
                            handleClickOpen2(position);
                        }}
                        >
                            <EditOutlinedIcon/> Edit
                            </div>

                            :
                            <div></div>
                            }
                           


                        </div>

                    <Dialog open={open2} onClose={handleClose2}>
                    <DialogTitle>Edit Position</DialogTitle>
                    <DialogContent>
                    <div className='dialog-container'>

                        {/* Start of school name */}
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginTop:'15px'
                    }}>
                        <div style={{
                            color:'black'
                        }}>
                            Position Title
                        </div>

                        <div>
                            <TextField
                                name="positionTitle"
                                value={tempPosition.positionTitle}
                                onChange={(e) => {
                                    setTempPosition({...tempPosition, [e.target.name]: e.target.value})
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
                            Description of position
                        </div>

                        <div>
                            <TextField
                                name="descriptionOfPosition"
                                value={tempPosition.descriptionOfPosition}
                                onChange={(e) => {
                                    setTempPosition({...tempPosition, [e.target.name]: e.target.value})
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
                        value={tempPosition.positionSkills[tempPosition.positionSkills.length-1]}
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
                    
                    tempPosition.positionSkills.map((skill) =>
                        (
                        <div>
                        <div  className='skill'>
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
                
                {/* Start of date of education */}
                    
                {/* End of date of education */}
                </div>
                {/* End of school name */}
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>{editPositionApi(tempPosition, tempPosition._id)}}>Save</Button>
                    </DialogActions>
             </Dialog>

                <div className='position-desc'>
                    {position.descriptionOfPosition}

                </div>

                

                <div style={{
                            display:'flex',
                            flexDirection:'row',
                            flexWrap:'wrap'
                        }}>
                    {
                    
                    position.positionSkills.map((skill) =>
                        (
                        <div>
                        <div  className='position-skill'>
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
                   console.log('No Position details')
                }
                </div>
            </div>
        </>
    )
}
export default ProfilePositions