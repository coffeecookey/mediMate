// RefreshHandler.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate= useNavigate()

  useEffect(() => {

    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);

      // Redirect only if on login/signup and already authenticated
      if (
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/dashboard", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
};

export default RefreshHandler;
