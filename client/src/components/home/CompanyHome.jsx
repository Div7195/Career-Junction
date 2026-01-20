import '../../css/aspirantHome.css'
import CompanySidebar from '../sidebar/CompanySidebar'
const AspirantHome = () =>{
    return(
        <>
             <div style={{
                 display:'flex',
                 flexDirection:'row',
                 
               }}>
                     <CompanySidebar/>
                     <div className="boxcontainer">     
     
                     <div style={{
                     display:'flex',
                     flexDirection:'column',
                     width:'100%'
                     }}>
     
                     <div className="sub-boxcontainer">
     
                         <div style={{
                             fontSize:'40px'
                         }}>
                             Find Talents/Employees At One Place
                         </div>
                         <div style={{
                             fontSize:'70px',
                             fontWeight:'700',
                             color:'#04274a'
                         }}>
                             Career Junction
                         </div>
                         
                         <div style={{
                             fontSize:'25px'
                         }}>
                             Get Potential Employees By Posting Jobs
                         </div>
                         <div style={{
                             fontSize:'25px'
                         }}>
                             Boost Your Business By Getting Best People
                         </div>
                     </div>
     
                     
                     <div className='classC'>
                    <img style={{width:'60%',
                    height:'70%',
                     borderRadius:'80px'}} src='https://media.licdn.com/dms/image/D5612AQGWl3NB5d2cxQ/article-cover_image-shrink_720_1280/0/1699253349156?e=2147483647&v=beta&t=jOOTXqQqln7MQyjFhG_v30u-7EslUweK9_EhCGdLXu0'/>

                </div>
     
                     </div>
                 </div>
             </div>
        </>
         );
}

export default AspirantHome;