import CompanySidebar from "../sidebar/CompanySidebar"
import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Applicant from "./Applicant"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utility functions/util"
const CompanyApplicants = () => {
    const [applicants, setApplicants] = useState([])
    const navigate = useNavigate();
    const {id} = useParams();
    const {account}=useContext(DataContext);
    useEffect(() => {
      const myFunction = async() => {
        const url = `https://career-junction.vercel.app/getJobApplicants?jobId=${id}`;
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
            setApplicants(response.applicants);
            
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
            flexDirection:'row'
          }}>
          <CompanySidebar/>
          
        <div style={{
            width:'100%',
            display:'flex',
            justifyContent:'center',
            
            
            
        }}>
        <div style={{
            display:'flex',
            flexDirection:'column',
            flexBasis:"80%"
        }}>

        {
            
            applicants && applicants.length > 0 ?
            applicants.map((applicant => (
                <Applicant 
                applicant={applicant}
                jobId = {id}
                />
            )))
            :
            <div></div>
        }
        
        </div>
            
            

            
        </div>
        </div>
        </>
    )
}
export default CompanyApplicants