import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Applicant = ({applicant, jobId}) => {
    const navigate = useNavigate()
    return(
        <>
        
            <div style={{
            display:'flex',
            flexDirection:'column',
            padding:'10px',
            marginBottom:'20px',
            border: '2px solid #ebf0f5',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            boxSizing: 'border-box',
            borderRadius: '10px 10px 10px 10px',
                
        }}>
                <div style={{
                display:'flex',
                flexDirection:'row',
                
            }}>

                <div style={{
                    
                    fontSize:'20px',
                    color:'#1e272e',
                    fontFamily: "DM Sans",
                    fontWeight: 'bold',
                    
                    
                }}>
                    
                        {applicant.aspirantName}
                    
                </div>
                <div style={{
                    marginLeft:'auto',
                    marginRight:'10px',
                    fontSize:'16px',
                    display:'flex',
                    flexDirection:'row',
                }}>
                <Link to={`/company/aspirantprofile/${applicant.aspirantAccountId}`} style={{textDecoration:'none' , color:'inherit'}}>
                <div style={{
                    marginLeft:'auto',
                    marginRight:'10px',
                    background:"rgb(66 142 81)",
                    borderRadius:'5px',
                    fontSize:'16px',
                    padding:'5px',
                    color:'white'
                }}>
                    View Profile
                </div>
                </Link>
                {/* <Link to={`/job/${jobId}/messages/${applicant.aspirantAccountId}`} style={{textDecoration:'none' , color:'inherit'}}> */}
                <div style={{
                    marginRight:'10px',
                    background:"rgb(66 142 81)",
                    borderRadius:'5px',
                    fontSize:'16px',
                    padding:'5px',
                    color:'white',
                    cursor:'pointer'
                }}
                onClick={() => {
                    navigate(`/company/job/${jobId}/messages/${applicant.aspirantAccountId}`)
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