import CompanySidebar from "../sidebar/CompanySidebar";
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { getAccessToken } from "../../utility functions/util";
import { TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
const JobMessages = () => {
    const {account}=useContext(DataContext);
    const newMessageInitial = {
        senderRole:account.role,
        messageBody:'',
        messageTimestamp:new Date(),
        seenFlag:false
    }
    const navigate = useNavigate();
    const {id,aspirantAccountId} = useParams();
    console.log('we are here')
    const [data, setData] = useState({})
    const [newMessage, setNewMessage] = useState(newMessageInitial)
    const sendMessage = async() => {
        const settings = {
         method: "POST",
         body: JSON.stringify({
            aspirantAccountId:aspirantAccountId,
            jobId:id,
            newMessage:newMessage
         }),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
             'authorization' : getAccessToken()
         }
         }
         try {
             console.log(settings.body)
             const fetchResponse = await fetch(`http://localhost:8000/updateJobMessages`, settings);
             const response = await fetchResponse.json();
            if(response.msg === 'success'){
                setData({...data, messages:[...data.messages, newMessage]});
                setNewMessage(newMessageInitial)
            }else{

            }
             
         } catch (e) {
             
             return e;
         }    
    }


    useEffect(() => {
    const myFunction = async() => {
        const url = `http://localhost:8000/getJobMessages?jobId=${id}&aspirantAccountId=${aspirantAccountId}`;
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
            setData(response)
            
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
            flexDirection:'row',
            justifyContent:'center'
            }}>
            <CompanySidebar/>
            <div style={{
            display:'flex',
            flexBasis:"70%",
            flexDirection:'column',
            height:'600px'
            
            
        }}>
        <div style={{
            display:'flex',
            flexDirection:'column',
            marginBottom:'5px',
            marginTop:'auto',
        }}>
            <div style={{
                display:'flex',
                flexDirection:'column-reverse',
                maxHeight:'70%',
                overflowY:'auto',
                
            }}>
                {
                    data.messages && data.messages.length > 0 ? data.messages.map((e =>(
                        <>
                            <div style={{
                                marginTop:'10px'
                            }}>
                                {
                                    e.role === account.role?
                                    <div style={{
                                        marginRight:'5px',
                                        marginLeft:'auto',
                                        borderRadius:'5px',
                                        background:'#f6f8ff',
                                        maxWidth:'60%',
                                        color:'#142683'
                                    }}>
                                    {e.messageBody}
                                    </div>
                                    :
                                    <div style={{
                                        marginRight:'auto',
                                        marginLeft:'5px',
                                        borderRadius:'5px',
                                        background:'#f6f8ff',
                                        maxWidth:'60%',
                                        color:'#142683'
                                    }}>
                                    {e.messageBody}
                                    </div>
                                }

                            </div>
                        </>
                    )))
                    :
                    <div></div>
                }
            </div>
            <div style={{
                display:'flex',
                flexDirection:'row',
            }}>
                <div style={{
                    flexBasis:'90%',
                    border:'1px solid #ebf0f5',
                    borderRadius:'5px',
                    
                }}>
                    <TextField style={{
                        width:'100%'
                    }} 
                    id="filled-multiline-flexible" 
                    variant="filled" 
                    label="Multiline"
                    multiline
                    />
                </div>
                <div style={{
                    marginBottom:'0px',
                    marginTop:'auto',
                    background:"rgb(66 142 81)",
                    borderRadius:'5px',
                    padding:'15px',
                    color:'white',
                    height:'fit-content',
                    cursor:'pointer'
                }}>
                <SendIcon/>
                </div>
            </div>

        </div>


        </div>


          </div>
        </>
    )

}
export default JobMessages;