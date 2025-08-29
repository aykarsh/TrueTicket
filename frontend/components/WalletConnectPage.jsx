import React, { useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import useWallet from '../src/hooks/useWallet';
import { userSession } from '../src/utils/auth';

const ConnectWalletPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, isSignedIn } = useWallet();
  // Always get role from localStorage for redirect reliability
  const role = localStorage.getItem('trueticket_role') || (location.state && location.state.role) || 'Customer';
  const { doOpenAuth } = useConnect();

  useEffect(() => {
    // Persist role for reloads
    if (location.state && location.state.role) {
      localStorage.setItem('trueticket_role', location.state.role);
    }
  }, [location.state]);

  useEffect(() => {
    // Always check session directly for bulletproof redirect
    if (userSession.isUserSignedIn()) {
      if (role === 'Organizer') {
        navigate('/organizer-dashboard', { replace: true });
      } else {
        navigate('/customer-dashboard', { replace: true });
      }
    }
  }, [navigate, role]);

const handleConnect = () => {
  doOpenAuth({
    onFinish: () => {
      window.location.reload();
      console.log("connected")
    }
  });
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center"
      >
        <LogIn size={48} className="text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Connect Your Wallet</h2>
        <p className="mb-6 text-gray-500 text-center max-w-xs">
          Please connect your Stacks wallet to continue to your dashboard.
        </p>
        <button
          onClick={handleConnect}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded shadow text-lg"
        >
          Connect Wallet
        </button>
      </motion.div>
    </div>
  );
};

export default ConnectWalletPage;