import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import Header from '../Components/Header/Header';
import { Divider } from '@mantine/core';
import FindJobsPage from './FindJobsPage';
import FindTalentPage from './FindTalenPaget';
import JobDescPage from './JobDescPage';
import ApplyJobPage from './ApplyJobPage';
import PostJobPage from './PostJobPage';
import PostedJobPage from './PostedJobPage';
import JobHistoryPage from './JobHistoryPage';
import CompanyPage from './CompanyPage';
import SignUpPage from './SignUpPage';
import ProfilePage from './ProfilePage';
import TalentProfilePage from './TalentProfilePage';
import HomePage from './HomePage';
import Footer from '../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import RoleProtectedRoute from '../Components/RoleProtectedRoute';

const AppRoutes=()=>{
    const user=useSelector((state:any)=>state.user)
    return <BrowserRouter>
      <div className='relative'>
      <ScrollToTop />
      <Header />
      <Divider size="xs" mx="md" />
      <Routes>
        <Route path="/find-jobs" element={ <RoleProtectedRoute allow={["APPLICANT","EMPLOYER"]}> <FindJobsPage /> </RoleProtectedRoute>} />
        <Route path='/find-talent' element={ <RoleProtectedRoute allow={["APPLICANT","EMPLOYER"]}><FindTalentPage /> </RoleProtectedRoute>}/>
        <Route path='/jobs/:id' element={ <RoleProtectedRoute allow={["APPLICANT","EMPLOYER"]}><JobDescPage /> </RoleProtectedRoute>} />
        <Route path="/apply-job/:id" element={<RoleProtectedRoute allow={["APPLICANT","EMPLOYER"]}><ApplyJobPage /> </RoleProtectedRoute>} />
        <Route path='/post-job/:id' element={<RoleProtectedRoute allow={["EMPLOYER"]}><PostJobPage /> </RoleProtectedRoute>} />
        <Route path="/posted-jobs/:id" element={ <RoleProtectedRoute allow={["EMPLOYER"]}><PostedJobPage /> </RoleProtectedRoute>} />
        <Route path='/job-history' element={<RoleProtectedRoute allow={["APPLICANT","EMPLOYER"]}><JobHistoryPage /></RoleProtectedRoute>} />
        <Route path='/company/:name' element={<RoleProtectedRoute allow={["APPLICANT","EMPLOYER"]}><CompanyPage /></RoleProtectedRoute>} />
        <Route path='/signup' element={user?<Navigate to="/" />:<SignUpPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/login' element={user?<Navigate to="/" />:<SignUpPage />} />
        <Route path='/talent-profile/:id' element={<RoleProtectedRoute allow={["APPLICANT","EMPLOYER"]}> <TalentProfilePage /> </RoleProtectedRoute>} />
        <Route path='*' element={<HomePage />} />
      </Routes>
      <Footer />
      </div>
      </BrowserRouter>
}

export default AppRoutes;