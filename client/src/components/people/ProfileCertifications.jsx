
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
import '../../css/certifications.css'
const ProfileCertifications = ({aspirant, onUpdate}) =>{
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const certificateObjInitial = {
        certificationTitle:'',
        certificationDesc:'',
        certificationLink:'',
        certificateIssueDate:'',
        certificateSkills:[],
        _id:''
    }
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [tempCertificate, setTempCertificate] = useState(certificateObjInitial)
    const handleClickOpen = () => {
        setTempCertificate(certificateObjInitial)
        setOpen(true);
    };
    const handleClickOpen2 = (certification) => {
        setTempCertificate(certification)
        setOpen2(true);
    };

    const handleClose = () => {
        setTempCertificate(certificateObjInitial)
        setOpen(false);
  };
  const handleClose2 = () => {
    setTempCertificate(certificateObjInitial)
    setOpen2(false);
};
  const handleStartDateChange = (e) => {
        
    setTempCertificate({...tempCertificate, certificateIssueDate:e.$d});
    
}
const handleFinishDateChange = (e) => {
    
    setTempCertificate({...tempCertificate, finishDate:e.$d});
}

const handleSkillSelect = (e) => {
    setTempCertificate({...tempCertificate, certificateSkills:[...tempCertificate.certificateSkills, e.target.value]});
}
const handleDeleteSkill = (skill) => {
    setTempCertificate({...tempCertificate, certificateSkills:tempCertificate.certificateSkills.filter((e)=>{
        if(e !== skill) return e;
    })});
}

const addNewCertificateApi = async(field)=> {
    
    let tempArray = aspirant.certifications;
    
    tempArray.push(field);
    const settings = {
        method: "POST",
        body: JSON.stringify({
            certifications:tempArray
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
            setTempCertificate(certificateObjInitial)
            onUpdate(response)
            handleClose()
        } catch (e) {
            setTempCertificate(certificateObjInitial)
            return e;
        }    
}

const editCertificateApi = async(field, id) => {
    let tempArray = aspirant.certifications;
    for(let i = 0;i<tempArray.length;i++){
        if(tempArray[i]._id === id){
            tempArray[i] = field
            break;
        }
    }

    const settings = {
        method: "POST",
        body: JSON.stringify({
            certifications:tempArray
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'authorization' : getAccessToken()
        }
        }
        try {
           
            const fetchResponse = await fetch(`http://localhost:8000/updateAspirantProfile?aspirantAccountId=${account.id}`, settings);
            const response = await fetchResponse.json();
            setTempCertificate(certificateObjInitial)
            onUpdate(response)
            console.log(aspirant)
            handleClose2()
        } catch (e) {
            setTempCertificate(certificateObjInitial)
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
                Add Certificates
                </div>
                <div style={{
                    color:'#566474',
                    
                }}>
                Certifications you have obtained
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
                    <DialogTitle>Add New Certification</DialogTitle>
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
                            Certification Title
                        </div>

                        <div>
                            <TextField
                                name="certificationTitle"
                                value={tempCertificate.certificationTitle}
                                onChange={(e) => {
                                    setTempCertificate({...tempCertificate, [e.target.name]: e.target.value})
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
                            Certificate Description
                        </div>

                        <div>
                            <TextField
                                name="certificationDesc"
                                value={tempCertificate.certificationDesc}
                                onChange={(e) => {
                                    setTempCertificate({...tempCertificate, [e.target.name]: e.target.value})
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
                            Certification Link
                        </div>

                        <div>
                            <TextField
                                name="certificationLink"
                                value={tempCertificate.certificationLink}
                                onChange={(e) => {
                                    setTempCertificate({...tempCertificate, [e.target.name]: e.target.value})
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
                        value={tempCertificate.certificateSkills[tempCertificate.certificateSkills.length-1]}
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
                    
                    tempCertificate.certificateSkills.map((skill) =>
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

                <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px'
            }}>
                <div style={{
                    color:'black'
                }}>
                    Issue Date
                </div>

                <div>
                
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                <DatePicker  label="Select start date" value={dayjs(tempCertificate.certificateIssueDate)}
          onChange={(e) => {handleStartDateChange(e)}}/>
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
                    <Button onClick={()=>{addNewCertificateApi(tempCertificate)}}>Save</Button>
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
                    aspirant.certifications &&  aspirant.certifications.length > 0 ? aspirant.certifications.map((certification) => (
                        
                        
                        <div className='certification-container'>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',

                        }}>
                            <div style={{
                                color:'black',
                                fontSize:'20px',
                            }}>
                            {certification.certificationTitle}
                            </div>

                            {
                            account.role !== 'company'?
                            <div className='edit'
                        onClick={() => {
                            
                            handleClickOpen2(certification);
                        }}
                        >
                            <EditOutlinedIcon/> Edit
                            </div>

                            :
                            <div></div>
                            }
                            


                        </div>

                        <Dialog open={open2} onClose={handleClose2}>
                    <DialogTitle>Edit Certification</DialogTitle>
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
                            Certification Title
                        </div>

                        <div>
                            <TextField
                                name="certificationTitle"
                                value={tempCertificate.certificationTitle}
                                onChange={(e) => {
                                    setTempCertificate({...tempCertificate, [e.target.name]: e.target.value})
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
                            Certificate Description
                        </div>

                        <div>
                            <TextField
                                name="certificationDesc"
                                value={tempCertificate.certificationDesc}
                                onChange={(e) => {
                                    setTempCertificate({...tempCertificate, [e.target.name]: e.target.value})
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
                            Certification Link
                        </div>

                        <div>
                            <TextField
                                name="certificationLink"
                                value={tempCertificate.certificationLink}
                                onChange={(e) => {
                                    setTempCertificate({...tempCertificate, [e.target.name]: e.target.value})
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
                        value={tempCertificate.certificateSkills[tempCertificate.certificateSkills.length-1]}
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
                    
                    tempCertificate.certificateSkills.map((skill) =>
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

                <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px'
            }}>
                <div style={{
                    color:'black'
                }}>
                    Issue Date
                </div>

                <div>
                
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                <DatePicker  label="Select start date" value={dayjs(tempCertificate.certificateIssueDate)}
          onChange={(e) => {handleStartDateChange(e)}}/>
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
                    <Button onClick={()=>{editCertificateApi(tempCertificate, tempCertificate._id)}}>Save</Button>
                    </DialogActions>
             </Dialog>  
                     <div style={{
                            color: '#9eaab7',
                            fontSize:'14px',
                            marginTop: '5px'
                        }}>
                            {monthMap[new Date(certification.certificateIssueDate).getMonth()+1]} {new Date(certification.certificateIssueDate).getFullYear()}
                    </div>

                

                <div className='certificate-desc'>
                    {certification.certificationDesc}

                </div>

                <Link>
                    <div  className='certificate-link'
                    onClick = {() => {
                        window.open(certification.certificationLink,'_blank' )
                    }}
                    >
                        Certification Link

                    </div>
                </Link>
                

                <div style={{
                            display:'flex',
                            flexDirection:'row',
                            flexWrap:'wrap'
                        }}>
                    {
                    
                        certification.certificateSkills.map((skill) =>
                        (
                        <div>
                        <div  className='certificate-skill'>
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
                   console.log('No certification details')
                }
                </div>
            </div>
        </>
    )
}
export default ProfileCertifications