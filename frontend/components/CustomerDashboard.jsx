


import React, { useState, useRef, useEffect } from 'react';
import useWallet from '../src/hooks/useWallet';
import { useConnect } from '@stacks/connect-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, User, Search, CheckCircle, Repeat2, LogOut } from 'lucide-react';
import { STACKS_TESTNET } from '@stacks/network';
import {
  makeContractCall,
  bufferCVFromString,
  uintCV,
  standardPrincipalCV,
  cvToJSON
} from '@stacks/transactions';
import { fetchCallReadOnlyFunction } from '@stacks/transactions/dist/fetch';

// Set your contract address and name here
const CONTRACT_ADDRESS = 'ST1GBHM2AE87S825B66NY529PMT18TW2NN39STGAS'; // TODO: Replace with your deployed contract address
const CONTRACT_NAME = 'ticketing';
const NETWORK = STACKS_TESTNET;

const NAV_ITEMS = [
  { label: 'Buy Ticket', id: 'buy-ticket' },
  { label: 'Resell Ticket', id: 'resell-ticket' },
  { label: 'Get Event Details', id: 'get-event' },
  { label: 'Get Ticket Owner', id: 'get-owner' },
];

const CustomerDashboard = () => {
  const { isSignedIn, loading } = useWallet();
  const { doOpenAuth } = useConnect();
  const navigate = useNavigate();
  // Ticket Purchase
  const [buyEventId, setBuyEventId] = useState('');
  const [buyMsg, setBuyMsg] = useState('');

  // Ticket Resale
  const [resaleEventId, setResaleEventId] = useState('');
  const [resaleTicketId, setResaleTicketId] = useState('');
  const [resaleNewPrice, setResaleNewPrice] = useState('');
  const [resaleNewBuyer, setResaleNewBuyer] = useState('');
  const [resaleMsg, setResaleMsg] = useState('');

  // Read-only Queries
  const [queryEventId, setQueryEventId] = useState('');
  const [eventDetails, setEventDetails] = useState(null);
  const [queryTicketEventId, setQueryTicketEventId] = useState('');
  const [queryTicketId, setQueryTicketId] = useState('');
  const [ticketOwner, setTicketOwner] = useState(null);

  const [activeTab, setActiveTab] = useState('buy-ticket');
  const sectionRefs = {
    'buy-ticket': useRef(null),
    'resell-ticket': useRef(null),
    'get-event': useRef(null),
    'get-owner': useRef(null),
  };


  // --- Contract-integrated handlers ---
  const handleBuyTicket = async (e) => {
    e.preventDefault();
    setBuyMsg('');
    if (!buyEventId) return setBuyMsg('Event ID required');
    try {
      const txOptions = {
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'buy-ticket',
        functionArgs: [uintCV(Number(buyEventId))],
        network: NETWORK,
        appDetails: { name: 'TrueTicket' },
      };
      const { doContractCall } = useConnect();
      await doContractCall(txOptions);
      setBuyMsg('Transaction submitted!');
    } catch (err) {
      setBuyMsg('Error: ' + (err.message || err));
    }
  };

  const handleResellTicket = async (e) => {
    e.preventDefault();
    setResaleMsg('');
    if (!resaleEventId || !resaleTicketId || !resaleNewPrice || !resaleNewBuyer)
      return setResaleMsg('All fields required');
    try {
      const txOptions = {
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'resell-ticket',
        functionArgs: [
          uintCV(Number(resaleEventId)),
          uintCV(Number(resaleTicketId)),
          uintCV(Number(resaleNewPrice)),
          standardPrincipalCV(resaleNewBuyer)
        ],
        network: NETWORK,
        appDetails: { name: 'TrueTicket' },
      };
      const { doContractCall } = useConnect();
      await doContractCall(txOptions);
      setResaleMsg('Transaction submitted!');
    } catch (err) {
      setResaleMsg('Error: ' + (err.message || err));
    }
  };

  const handleQueryEvent = async (e) => {
    e.preventDefault();
    setEventDetails(null);
    if (!queryEventId) return;
    try {
      const result = await fetchCallReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-event',
        functionArgs: [uintCV(Number(queryEventId))],
        network: NETWORK,
        senderAddress: CONTRACT_ADDRESS,
      });
      setEventDetails(cvToJSON(result).value);
    } catch (err) {
      setEventDetails({ error: err.message || err });
    }
  };

  const handleQueryTicketOwner = async (e) => {
    e.preventDefault();
    setTicketOwner(null);
    if (!queryTicketEventId || !queryTicketId) return;
    try {
      const result = await fetchCallReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-ticket-owner',
        functionArgs: [uintCV(Number(queryTicketEventId)), uintCV(Number(queryTicketId))],
        network: NETWORK,
        senderAddress: CONTRACT_ADDRESS,
      });
      setTicketOwner(cvToJSON(result).value);
    } catch (err) {
      setTicketOwner('Error: ' + (err.message || err));
    }
  };

  const handleNavClick = (id) => {
    setActiveTab(id);
    sectionRefs[id].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Show loading state
  if (loading) return <div>Loading...</div>;

  // Modal overlay for wallet connect
  const WalletConnectModal = () => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center"
        >
          <Ticket className="text-blue-500 mb-4" size={40} />
          <h2 className="text-xl font-bold mb-2 text-gray-800">Connect Your Wallet</h2>
          <p className="text-gray-500 mb-6 text-center">You must connect your Stacks wallet to access your dashboard.</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold shadow"
            onClick={() => doOpenAuth()}
          >
            Connect Wallet
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col relative">
      {!isSignedIn && <WalletConnectModal />}
      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <span className="bg-blue-100 rounded px-2 py-1 text-blue-600">TrueTicket</span>
          </div>
          <nav className="flex gap-8 relative">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative px-2 py-1 text-gray-700 font-medium focus:outline-none"
              >
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="underline-cust"
                    className="absolute left-0 right-0 -bottom-1 h-1 bg-blue-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
          <button
            className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition"
            onClick={() => navigate('/')}
          >
            <LogOut size={20} />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            Hello There! <span className="text-2xl">👋</span>
          </h2>
          <p className="text-gray-500 text-lg">Welcome to your dashboard</p>
        </section>

        {/* Buy Ticket */}
        <section ref={sectionRefs['buy-ticket']} className="mb-12" id="buy-ticket">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
              <User className="text-blue-500" size={24} />
              Buy Ticket
            </h3>
            <form className="space-y-4" onSubmit={handleBuyTicket}>
              <div>
                <label className="block text-gray-600 mb-1">Event ID</label>
                <input type="number" min={1} value={buyEventId} onChange={e => setBuyEventId(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Event ID" />
              </div>
              <motion.button type="submit" whileTap={{ scale: 0.97 }} className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition">Buy Ticket</motion.button>
              {buyMsg && <div className="text-sm text-green-600 mt-2">{buyMsg}</div>}
            </form>
          </motion.div>
        </section>

        {/* Resell Ticket */}
        <section ref={sectionRefs['resell-ticket']} className="mb-12" id="resell-ticket">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
              <Repeat2 className="text-yellow-600" size={24} />
              Resell Ticket
            </h3>
            <form className="space-y-4" onSubmit={handleResellTicket}>
              <div>
                <label className="block text-gray-600 mb-1">Event ID</label>
                <input type="number" min={1} value={resaleEventId} onChange={e => setResaleEventId(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300" placeholder="Event ID" />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Ticket ID</label>
                <input type="number" min={1} value={resaleTicketId} onChange={e => setResaleTicketId(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300" placeholder="Ticket ID" />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">New Price (STX)</label>
                <input type="number" min={1} value={resaleNewPrice} onChange={e => setResaleNewPrice(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300" placeholder="New Price" />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">New Buyer Address</label>
                <input type="text" value={resaleNewBuyer} onChange={e => setResaleNewBuyer(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300" placeholder="Stacks Address" />
              </div>
              <motion.button type="submit" whileTap={{ scale: 0.97 }} className="w-full bg-yellow-600 text-white py-2 rounded font-semibold hover:bg-yellow-700 transition">Resell Ticket</motion.button>
              {resaleMsg && <div className="text-sm text-green-600 mt-2">{resaleMsg}</div>}
            </form>
          </motion.div>
        </section>

        {/* Get Event Details */}
        <section ref={sectionRefs['get-event']} className="mb-12" id="get-event">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
              <Search className="text-blue-500" size={24} />
              Get Event Details
            </h3>
            <form className="space-y-4" onSubmit={handleQueryEvent}>
              <div>
                <label className="block text-gray-600 mb-1">Event ID</label>
                <input type="number" min={1} value={queryEventId} onChange={e => setQueryEventId(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Event ID" />
              </div>
              <motion.button type="submit" whileTap={{ scale: 0.97 }} className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition">Get Event</motion.button>
            </form>
            {eventDetails && (
              <div className="mt-4 text-sm bg-gray-50 rounded p-3">
                <div><span className="font-semibold">ID:</span> {eventDetails.id}</div>
                <div><span className="font-semibold">Name:</span> {eventDetails.name}</div>
                <div><span className="font-semibold">Price:</span> {eventDetails.price} STX</div>
                <div><span className="font-semibold">Tickets:</span> {eventDetails.tickets}</div>
                <div><span className="font-semibold">Sold:</span> {eventDetails.sold}</div>
              </div>
            )}
          </motion.div>
        </section>

        {/* Get Ticket Owner */}
        <section ref={sectionRefs['get-owner']} id="get-owner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={24} />
              Get Ticket Owner
            </h3>
            <form className="space-y-4" onSubmit={handleQueryTicketOwner}>
              <div>
                <label className="block text-gray-600 mb-1">Event ID</label>
                <input type="number" min={1} value={queryTicketEventId} onChange={e => setQueryTicketEventId(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300" placeholder="Event ID" />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Ticket ID</label>
                <input type="number" min={1} value={queryTicketId} onChange={e => setQueryTicketId(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300" placeholder="Ticket ID" />
              </div>
              <motion.button type="submit" whileTap={{ scale: 0.97 }} className="w-full bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition">Get Owner</motion.button>
            </form>
            {ticketOwner && (
              <div className="mt-4 text-sm bg-gray-50 rounded p-3">
                <span className="font-semibold">Owner:</span> {ticketOwner}
              </div>
            )}
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default CustomerDashboard;
