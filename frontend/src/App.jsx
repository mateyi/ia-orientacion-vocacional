import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Assessment } from './pages/Assessment';
import { Results } from './pages/Results';
import { Chat } from './pages/Chat';
import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/assessment"
                element={
                  <ProtectedRoute>
                    <Assessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results/:assessmentId"
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
