import CompanySidebar from "../sidebar/CompanySidebar"
import AspirantSidebar from "../sidebar/AspirantSidebar"
import { useState, useEffect, useContext } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utility functions/util"
import '../../css/messageList.css'
const CompanyMessagesList = () => {
    const {account}=useContext(DataContext);
    const [chatsList, setChatsList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const myFunction = async() => {
            const url = `https://career-junction.vercel.app/getCompanyChats?companyAccountId=${account.id}`;
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
                setChatsList(response.data)
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
            {
                account.role === 'company'?<CompanySidebar/>:<AspirantSidebar/>
            }
            
            <div style={{
            width:'100%',
            display:'flex',
            justifyContent:'center',
        }}>

        <div style={{
            display:'flex',
            flexDirection:'column',
            flexBasis:'40%',
        }}>

            {
                chatsList && chatsList.length > 0 ?
                chatsList.map(e => (

                    <div className="message-box">

                     <div className="image-box">
                    <img src={'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'}alt="Aspirant Image" className="company-image" />
                </div>



                    <div className="chat-detail-box"
                onClick={() => {
                    navigate(`/company/job/${e.jobId}/messages/${e.aspirantAccountId}/chatId/${e.chatId}`)
                }}
                >
                <div style={{
                    display:'flex',
                    flexDirection:"row",
                    
                }}>
                <div className="aspirant-name">
                {e.aspirantName}

                </div>

                <div className="timestamp">
                    {new Date(e.lastMessageTimestamp).getDate()}/{new Date(e.lastMessageTimestamp).getMonth()+1}/{new Date(e.lastMessageTimestamp).getFullYear()}
                </div>

                </div>

                <div style={{
                    fontFamily:'DM Sans',
                    fontSize:'14px',
                    color:'black'
                }}>
                        {
                            e.jobTitle
                        }
                        {
                            e.jobType === 'Internship'?
                            ' Internship':
                            ''
                        }
                </div>
                <div className="message-text">
                {
                    e.lastMessageSentBy === 'company'?
                    'You: '
                    :
                    ''
                }
                        {
                            e.lastMessage.split("").length > 40?
                            e.lastMessage.slice(0, 39)+'...'
                            :
                            e.lastMessage
                        }
                </div>



                </div>
                </div>
                ))
                
                :
                <div>
                </div>
            }

            

        </div>

        </div>
        </div>
        </>
    )
}
export default CompanyMessagesList