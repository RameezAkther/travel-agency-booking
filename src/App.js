import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar/Navbar';
import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home/Home';
import Packages from './pages/Packages/Packages';
import PackageDetails from './pages/PackageDetails/PackageDetails';
import Booking from './pages/Booking';
import YourBookings from './pages/YourBookings';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import FooterComponenet from './components/Footer';
import Profile from './pages/Profile/Profile';
import AddPackages from './pages/AddPackages';
import ViewAllUsers from './pages/ViewAllUsers/ViewAllUsers';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/package-details" element={<PackageDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/your-bookings" element={<YourBookings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/add-package" element={<AddPackages />} />
          <Route path="/all-users" element={<ViewAllUsers />} />
        </Routes>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
      <FooterComponenet />
    </Router>
  );
}

export default App;
