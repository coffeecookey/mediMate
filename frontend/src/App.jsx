import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Doctors from './pages/Doctors';
import Contact from './pages/contact';
import Myprofile from './pages/Myprofile';
import About from './pages/about';
import Bookappointment from './pages/bookappointment';
import Myappointments from './pages/Myappointments';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoginToContinue from './pages/Logintocontinue';
import Dashboard from './pages/dashboard';
import Chatbot from './pages/chatbot';

import Login from './authPage/Login.jsx';
import Signup from './authPage/Signup.jsx';
import RefreshHandler from './RefreshHandler.jsx';

// ✅ BodyClassController inside same file for simplicity
const BodyClassController = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.className = ""; // clear old classes

    if (location.pathname === "/login") {
      document.body.classList.add("login-page");
    } else if (location.pathname === "/signup") {
      document.body.classList.add("signup-page");
    } else {
      document.body.classList.add("default-page");
    }
  }, [location]);

  return null; // nothing to render
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on first mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // PrivateRoute → redirects if not logged in
  const PrivateRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div>
      {/* ✅ BodyClassController runs on every route change */}
      <BodyClassController />

      <NavBar className="sticky top-0" />

      {/* ✅ Keep RefreshHandler outside Routes */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<Myprofile />} />
        <Route path="/book-appointments" element={<Bookappointment />} />
        <Route path="/redirecting" element={<LoginToContinue />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>

      <Footer className="sticky bottom-0" />
    </div>
  );
};

export default App;
