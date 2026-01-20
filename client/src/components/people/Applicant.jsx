import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import '../../css/applicant.css'
const Applicant = ({applicant, jobId}) => {
    const navigate = useNavigate()
    return(
        <>
        
            <div className="container">
                <div style={{
                display:'flex',
                flexDirection:'row',
                
            }}>

                <div className="applicant-name">
                    
                        {applicant.aspirantName}
                    
                </div>
                <div className="buttons">
                <Link to={`/company/aspirantprofile/${applicant.aspirantAccountId}`} style={{textDecoration:'none' , color:'inherit'}}>
                <div className="view-profile-button">
                    View Profile
                </div>
                </Link>
                {/* <Link to={`/job/${jobId}/messages/${applicant.aspirantAccountId}`} style={{textDecoration:'none' , color:'inherit'}}> */}
                <div className="view-messages-button"
                onClick={() => {
                    navigate(`/company/job/${jobId}/messages/${applicant.aspirantAccountId}/chatId/${applicant.chatId}`)
                }}
                >
                    Messages
                </div>
                {/* </Link> */}
                </div>
                
            </div>
        </div>
        
        </>
    )
}
export default Applicant