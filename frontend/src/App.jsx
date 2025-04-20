import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages
import Land from "./pages/Land-Page/Land";
import Home from "./pages/Home-Page/Home";
import DataIntake from "./pages/Data-Intake-Page/DataIntake.jsx";

// store
import { AuthStore } from "./stores/useAuthStore.js";

// components
import Spinner from "./customs/Spinner.jsx";

// Protected: only logged-in users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = AuthStore();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
};

// If authenticated, redirect from / to /home
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = AuthStore();
  if (isAuthenticated && user) return <Navigate to="/home" replace />;
  return children;
};

// Route only accessible if user has filled health info
const AllowOnlyIfUserInfoAvailable = ({ children }) => {
  const { user } = AuthStore();
  if (!user?.isUserInfoAvailable) return <Navigate to="/data-intake" replace />;
  return children;
};

// Route only accessible if user has NOT filled health info
const AllowOnlyIfUserInfoMissing = ({ children }) => {
  const { user } = AuthStore();
  if (user?.isUserInfoAvailable) return <Navigate to="/home" replace />;
  return children;
};

const App = () => {
  const { checkAuth, checkingAuth } = AuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (checkingAuth) return <Spinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectAuthenticatedUser>
              <Land />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <AllowOnlyIfUserInfoAvailable>
                <Home />
              </AllowOnlyIfUserInfoAvailable>
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-intake"
          element={
            <ProtectedRoute>
              <AllowOnlyIfUserInfoMissing>
                <DataIntake />
              </AllowOnlyIfUserInfoMissing>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
