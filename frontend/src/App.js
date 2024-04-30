import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/signup';
import Logout from './components/auth/Logout';

function App() {
  const [authState, setAuthState] = useState({ token: '', isLoggedIn: false });

  const handleLogin = (token) => {
    setAuthState({ token, isLoggedIn: true });
  };

  const handleLogout = (navigate) => {
    
    setAuthState({ token: '', isLoggedIn: false });
    
  };
  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar authState={authState} onLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/create"
            element={
              authState.isLoggedIn ? (
                <Create />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/read"
            element={
              authState.isLoggedIn && authState.token ? (
                <Read />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/:id"
            element={
              authState.isLoggedIn ? (
                <Update />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

