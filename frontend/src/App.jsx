import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import CustomAppBar from './components/Appbar';
import EventDashboard from './pages/EventDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/AdminDashboard';



function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <CustomAppBar />
            <Homepage />
          </>
        } />
        <Route path="/:login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path="/events" element={<EventDashboard />} />

      </Routes>
    </Router>
  );  


}

export default App;
