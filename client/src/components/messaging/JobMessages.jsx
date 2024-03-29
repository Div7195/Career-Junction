import CompanySidebar from "../sidebar/CompanySidebar";
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { getAccessToken } from "../../utility functions/util";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import SendIcon from '@mui/icons-material/Send';
import AspirantSidebar from "../sidebar/AspirantSidebar";
import { socket } from "../../service/socket.js";
const JobMessages = () => {
    
    const {account}=useContext(DataContext);
    const newMessageInitial = {
        senderRole:account.role,
        messageBody:'',
        messageTimestamp:new Date(),
        seenFlag:false
    }
    const navigate = useNavigate();
    const {id,aspirantAccountId, chatId} = useParams();
    console.log('we are here')
    const [data, setData] = useState({
        jobId:'',
        applicationStatus:'',
        _id:'',
        messages:[]
    })
    const [newMessage, setNewMessage] = useState(newMessageInitial)
    
    
    

    const sendMessage = async() => {
        newMessage.messageTimestamp = dayjs(new Date()).$d
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
                // data.messages.reverse();
                // data.messages.push(newMessage);
                // data.messages.reverse();
                socket.emit('send', {
                    msg:newMessage,
                })
                // setData({...data, messages:data.messages});
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
            response.messagesObj.messages.reverse();
            
            setData(response.messagesObj)
            
            socket.emit('joinroom', chatId);
            
            } catch (e) {
            console.log(e);
            }
    }
    myFunction()
    }, [])

    
    
    socket.on('receive',(obj)=>{
        let tempArray = []
        for(let i = 0; i<data.messages.length;i++){
            tempArray.push(data.messages[i])
        }
        console.log(data.messages)
        tempArray.reverse();
        tempArray.push(obj.msg);
        tempArray.reverse();
        setData({...data, messages:tempArray});
        })
   
   



    return(
        <>
            <div style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center'
            }}>
            {
                account.role === 'company'?<CompanySidebar/>:<AspirantSidebar/>
            }
            
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
                maxHeight:'580px',
                overflowY:'auto',
                
                
            }}>
                {
                    data.messages && data.messages.length > 0 ? data.messages.map((e =>(
                        <>
                            
                                {
                                    e.senderRole === account.role?
                                    <div style={{
                                        marginBottom:'10px',
                                        marginRight:'0px',
                                        marginLeft:'auto',
                                        borderRadius:'5px',
                                        background:'rgb(186 201 255)',
                                        maxWidth:'60%',
                                        padding:'10px',
                                        fontFamily:'DM Sans',
                                        color:'rgb(7 10 10)'
                                    }}>
                                    {e.messageBody}
                                    </div>
                                    :
                                    <div style={{
                                        marginBottom:'10px',
                                        marginRight:'auto',
                                        marginLeft:'5px',
                                        padding:'10px',
                                        borderRadius:'5px',
                                        background:'rgb(255 186 247)',
                                        maxWidth:'60%',
                                        fontFamily:'DM Sans',
                                        color:'rgb(7 10 10)'
                                    }}>
                                    {e.messageBody}
                                    </div>
                                }

                            
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
                    flexBasis:'98%',
                    border:'1px solid #ebf0f5',
                    borderRadius:'5px',
                    
                }}>
                    <TextField style={{
                        width:'100%'
                    }} 
                    name="messageBody"
                    value={newMessage.messageBody}
                    onChange={(e) => {setNewMessage({...newMessage, [e.target.name]:e.target.value}); console.log(newMessage)}}
                    id="filled-multiline-flexible" 
                    variant="filled" 
                    label="Multiline"
                    multiline
                    />
                </div>
                <div style={{
                    flexBasis:'2%',
                    marginBottom:'0px',
                    marginTop:'auto',
                    background:"rgb(66 142 81)",
                    borderRadius:'5px',
                    padding:'15px',
                    color:'white',
                    height:'fit-content',
                    cursor:'pointer'
                }}
                onClick={() => {sendMessage()}}
                >
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