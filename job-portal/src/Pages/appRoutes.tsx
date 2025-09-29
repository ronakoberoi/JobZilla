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

const AppRoutes=()=>{
    const user=useSelector((state:any)=>state.user)
    return <BrowserRouter>
      <div className='relative'>
      <ScrollToTop />
      <Header />
      <Divider size="xs" mx="md" />
      <Routes>
        <Route path='/find-jobs' element={<FindJobsPage />} />
        <Route path='/find-talent' element={<FindTalentPage />} />
        <Route path='/jobs/:id' element={<JobDescPage />} />
        <Route path="/apply-job/:id" element={<ApplyJobPage />} />
        <Route path='/post-job' element={<PostJobPage />} />
        <Route path='/posted-jobs/:id' element={<PostedJobPage />} />
        <Route path='/job-history' element={<JobHistoryPage />} />
        <Route path='/company/:name' element={<CompanyPage />} />
        <Route path='/signup' element={user?<Navigate to="/" />:<SignUpPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/login' element={user?<Navigate to="/" />:<SignUpPage />} />
        <Route path='/talent-profile' element={<TalentProfilePage />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
      <Footer />
      </div>
      </BrowserRouter>
}

export default AppRoutes;