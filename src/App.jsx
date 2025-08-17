// src/App.jsx
import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// --- Layouts & Loaders ---
import MainLayout from './pages/MainLayout';
import Preloader from './components/ui/Preloader';

// --- ADMIN PAGES (Standard Imports) ---
import SecurityDashboard from './features/admin/pages/SecurityDashboard';
import SuperModeDashboard from './features/admin/pages/SuperModeDashboard';
import ProductDashboard from './features/admin/pages/ProductDashboard';
import DeveloperDashboard from './features/admin/pages/DeveloperDashboard';
import SupportDashboard from './features/admin/pages/SupportDashboard';
import MarketingDashboard from './features/admin/pages/MarketingDashboard';
import LeaderboardAdmin from './features/admin/pages/LeaderboardAdmin';
import LearnAndWinAdmin from './features/admin/pages/LearnAndWinAdmin';

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/security" replace /> },
      { path: 'security', element: <SecurityDashboard /> },
      { path: 'super-mode', element: <SuperModeDashboard /> },
      { path: 'product', element: <ProductDashboard /> },
      { path: 'developer', element: <DeveloperDashboard /> },
      { path: 'support', element: <SupportDashboard /> },
      { path: 'marketing', element: <MarketingDashboard /> },
      { path: 'leaderboard', element: <LeaderboardAdmin /> },
      { path: 'learn-and-win', element: <LearnAndWinAdmin /> },
    ],
  },
  { path: '/', element: <Navigate to="/admin/security" replace /> },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <Preloader message="Initializing Admin Panel..." />
      ) : (
        <RouterProvider router={router} />
      )}
    </AnimatePresence>
  );
}

export default App;