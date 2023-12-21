import { Link } from "react-router-dom"


const Applicant = ({applicant}) => {
    
    return(
        <>
        <Link to={`/company/aspirantprofile/${applicant.aspirantAccountId}`} style={{textDecoration:'none' , color:'inherit'}}>
            <div style={{
            display:'flex',
            flexDirection:'column',
            padding:'10px',
            cursor:'pointer',
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
            </div>
        </div>
        </Link>
        </>
    )
}
export default Applicant