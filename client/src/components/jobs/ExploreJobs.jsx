import Job from "./Job"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utility functions/util"
import AspirantSidebar from "../sidebar/AspirantSidebar"
const ExploreJobs = () => {
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const [jobs, setJobs] = useState({})
    useEffect(() => {
        const myFunction = async() => {
        const url = `http://localhost:8000/getJobs?companyAccountId=${account.id}`;
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
            setJobs(response);
            
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
          <AspirantSidebar/>
          
        <div style={{
            width:'100%',
            display:'flex',
            justifyContent:'center',
            
            
            
        }}>
        <div style={{
            display:'flex',
            flexDirection:'column'
        }}>

        {
            jobs.objArrayOfJobs && jobs.objArrayOfJobs.length > 0 ? jobs.objArrayOfJobs.map(job => (
                        <Job  job = {job}
                            locationBased={jobs.locationBased}
                            companyName={jobs.companyName}

                        />
            ))
            :
            console.log('no data to show')
        }
        
        </div>
            
            

            
        </div>
        </div>
        </>
    )
    
}
export default ExploreJobs