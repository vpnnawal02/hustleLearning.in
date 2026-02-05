import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import { AdminProvider } from './components/contexts/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AdminProvider>
  </StrictMode>,
)
