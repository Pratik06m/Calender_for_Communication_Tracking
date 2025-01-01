import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import Notifications from './components/User/Notifications';
import CalendarView from './components/User/CalenderView';
import LoginPage from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <h1>Welcome to Calender Communication Tracker</h1>
      <div>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path='/notifications' element={<Notifications/>} />
          <Route path='/calender' element={<CalendarView/>} />
          <Route path="/" element={<LoginPage/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
