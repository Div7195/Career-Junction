import CompanyHeader from '../header/CompanyHeader.jsx';
import CompanySidebar from '../sidebar/CompanySidebar.jsx';
import { DataContext } from '../../context/DataProvider.jsx';
import { useContext } from 'react';
import AspirantSidebar from '../sidebar/AspirantSidebar.jsx';
const CompanyHome = () =>{
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    return(
        <div style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            
          }}>
          
          {account.role === 'company'?<CompanySidebar/>:<AspirantSidebar/>}
       
    </div>
    );
}

export default CompanyHome;