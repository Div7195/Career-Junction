import CompanySidebar from "../sidebar/CompanySidebar"
import AspirantSidebar from "../sidebar/AspirantSidebar"
import { useState, useEffect, useContext } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utility functions/util"
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

                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        border:'2px solid #ebe1f0',
                        borderRadius:'5px',
                        padding:'5px',
                        cursor:'pointer',
                        background:'#c7dff5',
                        marginTop:'10px'
                    }}>

                     <div style={{
                    display: 'block',
                    minWidth: '40px',
                    borderRadius:'25px',
                    background:'#cda8ff',
                    width:'40px',
                    height:'40px',
                    
                   
                }}>
                    <img src={'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'}alt="Aspirant Image" style={{
                   
                    display: 'block',     
                    width: '100%',
                    minWidth: '100%',
                    height: '100%',
                    minHeight: '100%',
                    borderWidth: '0px',
                    outline: 'none' ,
                    borderRadius:'60px',
                    objectFit:'cover'
                }} />
                </div>



                    <div style={{
                    display:'flex',
                    flexDirection:'column',
                    marginLeft:'5px',
                    flexGrow:2
                }}
                onClick={() => {
                    navigate(`/company/job/${e.jobId}/messages/${e.aspirantAccountId}/chatId/${e.chatId}`)
                }}
                >
                <div style={{
                    display:'flex',
                    flexDirection:"row",
                    
                }}>
                <div style={{
                    fontSize:'16px',
                    fontFamily:'DM Sans',
                    fontWeight:'800',
                    color:'#566474',
                    borderRadius:'5px',
                    padding:'5px',
                    background:"#dad4f0"
                }}>
                {e.aspirantName}

                </div>

                <div style={{
                    fontFamily:'DM Sans',
                    color:'#566474',
                    fontSize:'12px',
                    marginRight:'0px',
                    marginLeft:'auto',
                    marginTop:'5px'
                }}>
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

                <div style={{
                    marginTop:'5px',
                    fontFamily:'DM Sans',
                    fontSize:'14px',
                    color:'#566474'
                }}>
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