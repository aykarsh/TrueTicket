
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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


const App = () => (
  <Router>
    <Routes>
  <Route path="/customer-dashboard" element={<CustomerDashboard />} />
  <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
  <Route path="/" element={<LandingPage />} />
    </Routes>
  </Router>
);

export default App;