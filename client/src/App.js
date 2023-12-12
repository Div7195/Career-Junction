import logo from './logo.svg';
import './App.css';
import Login from './components/account/Login';
import DataProvider from './context/DataProvider';
import CompanyHome from './components/home/CompanyHome.jsx';
import { Route } from 'react-router-dom';
import {BrowserRouter, Routes} from 'react-router-dom';






function App() {
  return (
    
      <DataProvider>
        <BrowserRouter>
          
          <div >
            <Routes>
              {/* <Route path = '/login' element = {<Login/>}/> */}
              <Route  path = '/' element = {<CompanyHome/>}/>
              
              <Route  path = '/login' element = {<Login/>}/>
              
            </Routes>
          </div>
        </BrowserRouter>
     </DataProvider>
    
  );
}

export default App;