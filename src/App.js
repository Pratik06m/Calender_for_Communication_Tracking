import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import Notifications from './components/User/Notifications';
import CalendarView from './components/User/CalenderView';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path='/notifications' element={<Notifications/>} />
          <Route path='/calender' element={<CalendarView/>} />
          <Route path="/" element={<h1>Welcome to the Calendar App</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
