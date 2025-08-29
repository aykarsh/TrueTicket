
import React, { useState, useEffect, useRef } from 'react';
import { Connect } from '@stacks/connect-react';
import { motion, AnimatePresence } from 'framer-motion';
import useWallet from './hooks/useWallet';
import WalletConnectButton from './components/WalletConnectButton';
import {
  Ticket, 
  Menu, 
  X, 
  Star, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  Clock,
  CheckCircle,
  ArrowRight,
  QrCode,
  Phone,
  Mail,
  Coins,
  Eye,
  Database,
  Code,
  Lock
} from 'lucide-react';
import LandingPage from '../components/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomerDashboard from '../components/CustomerDashboard';
import OrganizerDashboard from '../components/OrganizerDashboard';
import WalletConnectPage from '../components/WalletConnectPage';


const App = () => {
  const { userData, loading } = useWallet();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold">TrueTicket</span>
              </div>
              <WalletConnectButton />
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
            <Route path="/connect-wallet" element={<WalletConnectPage />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;