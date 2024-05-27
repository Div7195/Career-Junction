import CompanySidebar from "../sidebar/CompanySidebar";
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { getAccessToken } from "../../utility functions/util";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import SendIcon from '@mui/icons-material/Send';
import AspirantSidebar from "../sidebar/AspirantSidebar";
import '../../css/chat.css'
// import { socket } from "../../service/socket";
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
             const fetchResponse = await fetch(`https://career-junction.vercel.app/updateJobMessages`, settings);
             const response = await fetchResponse.json();
            if(response.msg === 'success'){
                // data.messages.reverse();
                // data.messages.push(newMessage);
                // data.messages.reverse();
                // socket.emit('send', {
                //     msg:newMessage,
                // })
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
        
       
        const url = `https://career-junction.vercel.app/getJobMessages?jobId=${id}&aspirantAccountId=${aspirantAccountId}`;
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
            
            // socket.emit('joinroom', chatId);
            
            } catch (e) {
            console.log(e);
            }
    }
    myFunction()
    }, [])
   
   
//    socket.on('receive',(obj)=>{
//     console.log(data.messages)
//     data.messages.reverse();
//     data.messages.push(obj.msg);
//     data.messages.reverse();
//     setData({...data, messages:data.messages});
//     })
    // useEffect(() => {
    //     return () => {
    //       socket.disconnect()
    //     };
    //   }, []);
    



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
            
            <div className="main-box">

        <div className="sub-box">
            <div className="old-messages-box">
                {
                    data.messages && data.messages.length > 0 ? data.messages.map((e =>(
                        <>
                            
                                {
                                    e.senderRole === account.role?
                                    <div className="sent">
                                    {e.messageBody}
                                    </div>
                                    :
                                    <div className="receive">
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
                <div className="send-button"
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