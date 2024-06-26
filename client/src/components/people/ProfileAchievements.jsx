
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
import workTypes from '../../constants/workTypes.js';
import monthMap from '../../constants/monthMap.js';
import '../../css/achievements.css'
const ProfileAchievements = ({aspirant, onUpdate}) =>{
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const achievementObjInitial = {
        achievementDesc:'',
        _id:''
    }
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [tempAchievement, setTempAcheivement] = useState(achievementObjInitial)
    const handleClickOpen = () => {
        setTempAcheivement(achievementObjInitial)
        setOpen(true);
    };
    const handleClickOpen2 = (achievement) => {
        setTempAcheivement(achievement)
        setOpen2(true);
    };

    const handleClose = () => {
        setTempAcheivement(achievementObjInitial)
        setOpen(false);
  };
  const handleClose2 = () => {
    setTempAcheivement(achievementObjInitial)
    setOpen2(false);
};
  const handleStartDateChange = (e) => {
        
    setTempAcheivement({...tempAchievement, certificateIssueDate:e.$d});
    
}
const handleFinishDateChange = (e) => {
    
    setTempAcheivement({...tempAchievement, finishDate:e.$d});
}

const handleSkillSelect = (e) => {
    setTempAcheivement({...tempAchievement, certificateSkills:[...tempAchievement.certificateSkills, e.target.value]});
}
const handleDeleteSkill = (skill) => {
    setTempAcheivement({...tempAchievement, certificateSkills:tempAchievement.certificateSkills.filter((e)=>{
        if(e !== skill) return e;
    })});
}

const addNewAchievementApi = async(field)=> {
    
    let tempArray = aspirant.achievements;
    
    tempArray.push(field);
    const settings = {
        method: "POST",
        body: JSON.stringify({
            achievements:tempArray
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
            setTempAcheivement(achievementObjInitial)
            onUpdate(response)
            handleClose()
        } catch (e) {
            setTempAcheivement(achievementObjInitial)
            return e;
        }    
}

const editAchievementApi = async(field, id) => {
    let tempArray = aspirant.achievements;
    for(let i = 0;i<tempArray.length;i++){
        if(tempArray[i]._id === id){
            tempArray[i] = field
            break;
        }
    }

    const settings = {
        method: "POST",
        body: JSON.stringify({
            achievements:tempArray
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'authorization' : getAccessToken()
        }
        }
        try {
           
            const fetchResponse = await fetch(`http://localhost:8000/updateAspirantProfile?aspirantAccountId=${account.id}`, settings);
            const response = await fetchResponse.json();
            setTempAcheivement(achievementObjInitial)
            onUpdate(response)
            console.log(aspirant)
            handleClose2()
        } catch (e) {
            setTempAcheivement(achievementObjInitial)
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
                Add Achievements
                </div>
                <div style={{
                    color:'#566474',
                    
                }}>
                Achievements throughout your career
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
                    <DialogTitle>Add New Achievements</DialogTitle>
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
                            Achievement Description
                        </div>

                        <div>
                            <TextField
                                name="achievementDesc"
                                value={tempAchievement.achievementDesc}
                                onChange={(e) => {
                                    setTempAcheivement({...tempAchievement, [e.target.name]: e.target.value})
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

                

                    
                {/* End of date of education */}
                </div>
                {/* End of school name */}
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>{addNewAchievementApi(tempAchievement)}}>Save</Button>
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
                    aspirant.achievements &&  aspirant.achievements.length > 0 ? aspirant.achievements.map((achievement) => (
                        
                        
                        <div className='achivement-container'>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',

                        }}>
                            <div style={{
                                color:'black',
                                fontSize:'18px',
                                width:750
                            }}>
                            {achievement.achievementDesc}
                            </div>

                            {
                                account.role !== 'company'?
                                <div className='edit'
                        onClick={() => {
                            handleClickOpen2(achievement);
                        }}
                        >
                            <EditOutlinedIcon/> Edit
                            </div>
                            :
                            <div></div>
                            }
                            


                        </div>

                        <Dialog open={open2} onClose={handleClose2}>
                    <DialogTitle>Add New Achievements</DialogTitle>
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
                            Achievement Description
                        </div>

                        <div>
                            <TextField
                                name="achievementDesc"
                                value={tempAchievement.achievementDesc}
                                onChange={(e) => {
                                    setTempAcheivement({...tempAchievement, [e.target.name]: e.target.value})
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

                

                    
                {/* End of date of education */}
                </div>
                {/* End of school name */}
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>{editAchievementApi(tempAchievement, tempAchievement._id)}}>Save</Button>
                    </DialogActions>
             </Dialog>  

                            

                        </div>
                   ))
                   :
                   console.log('No certification details')
                }
                </div>
            </div>
        </>
    )
}
export default ProfileAchievements