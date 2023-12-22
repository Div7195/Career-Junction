import logo from './logo.svg';
import './App.css';
import Login from './components/account/Login';
import DataProvider from './context/DataProvider';
import CompanyHome from './components/home/CompanyHome.jsx';
import { Route } from 'react-router-dom';
import {BrowserRouter, Routes} from 'react-router-dom';
import CompanyHeader from './components/header/CompanyHeader.jsx';
import CreateNewJob from './components/jobs/CreateNewJob.jsx';
import CompanyOpenings from './components/jobs/CompanyOpenings.jsx';
import People from './components/people/People.jsx';
import Companies from './components/companies/Companies.jsx';

import Notifications from './components/notifs/Notifications.jsx';
import CompanyProfile from './components/companies/CompanyProfile.jsx';
import DetailedJob from './components/jobs/DetailedJob.jsx';
import EditJob from './components/jobs/EditJob.jsx';
import ExploreJobs from './components/jobs/ExploreJobs.jsx';
import AppliedJobs from './components/jobs/AppliedJobs.jsx';
import SavedJobs from './components/jobs/SavedJobs.jsx';
import AspirantProfile from './components/people/AspirantProfile.jsx';
import AspirantDetailedJob from './components/jobs/AspirantDetailedJob.jsx';
import Messages from './components/messaging/Messages.jsx';
import JobMessages from './components/messaging/JobMessages.jsx';
import CompanyApplicants from './components/people/CompanyApplicants.jsx';
import CompanyAspirantProfile from './components/people/CompanyAspirantProfile.jsx';



function App() {
  return (
    
      <DataProvider>
        <BrowserRouter>
          <CompanyHeader/>
        <div style={{marginTop:64}}>
            <Routes>
              {/* <Route path = '/login' element = {<Login/>}/> */}
              <Route  path = '/home' element = {<CompanyHome/>}/>
              
              <Route  path = '/login' element = {<Login/>}/>
              <Route  path = '/createjob' element = {<CreateNewJob/>}/>
              <Route  path = '/youropenings' element = {<CompanyOpenings/>}/>
              <Route  path = '/companyprofile' element = {<CompanyProfile/>}/>
              <Route  path = '/aspirantprofile' element = {<AspirantProfile/>}/>
              <Route  path = '/job/:id' element = {<EditJob/>}/>
              <Route  path = '/job/details/:id' element = {<DetailedJob/>}/>
              <Route  path = 'aspirant/job/details/:id' element = {<AspirantDetailedJob/>}/>
              <Route  path = '/people' element = {<People/>}/>
              <Route  path = '/companies' element = {<Companies/>}/>
              <Route  path = '/job/:id/messages/:aspirantAccountId' element = {<Messages/>}/>
              <Route  path = '/notifications' element = {<Notifications/>}/>
              <Route  path = '/explore/jobs' element = {<ExploreJobs/>}/>
              <Route  path = '/applied' element = {<AppliedJobs/>}/>
              <Route  path = '/saved/jobs' element = {<SavedJobs/>}/>
              <Route  path = '/company/job/:id/messages/:aspirantAccountId' element = {<JobMessages/>}/>
              <Route  path = '/job/:id/applicants' element = {<CompanyApplicants/>}/>
              <Route  path = '/company/aspirantprofile/:id' element = {<CompanyAspirantProfile/>}/>
            </Routes>
          </div>
        </BrowserRouter>
     </DataProvider>
    
  );
}

export default App;