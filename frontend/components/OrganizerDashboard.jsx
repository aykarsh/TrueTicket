

import React, { useState, useRef, useEffect } from 'react';
import useWallet from '../src/hooks/useWallet';
import { useConnect } from '@stacks/connect-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Ticket, LogOut, Calendar, FileText, MapPin } from 'lucide-react';
import { STACKS_TESTNET } from '@stacks/network';
import {
  makeContractCall,
  bufferCVFromString,
  uintCV,
  cvToJSON
} from '@stacks/transactions';
import { fetchCallReadOnlyFunction } from '@stacks/transactions/dist/fetch';

// Set your contract address and name here
const CONTRACT_ADDRESS = 'ST1GBHM2AE87S825B66NY529PMT18TW2NN39STGAS'; // TODO: Replace with your deployed contract address
const CONTRACT_NAME = 'ticketing';
const NETWORK = STACKS_TESTNET;

const NAV_ITEMS = [
  { label: "Create Event", id: "create-event" },
  { label: "Tickets", id: "mailroom" },
  { label: "Profile", id: "profile" },
];

export default function OrganizerDashboard() {
  const { isSignedIn, loading } = useWallet();
  const { doOpenAuth, doContractCall } = useConnect();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create-event");
  const [eventName, setEventName] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [maxResale, setMaxResale] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [myEvents, setMyEvents] = useState([]);
  const sectionRefs = {
    "create-event": useRef(null),
    mailroom: useRef(null),
    profile: useRef(null),
  };

  const handleNavClick = (id) => {
    setActiveTab(id);
    sectionRefs[id].current.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  // Create Event handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    if (!eventName || !ticketPrice || !totalTickets || !maxResale) {
      setError("All fields required");
      return;
    }
    try {
      const txOptions = {
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'create-event',
        functionArgs: [
          bufferCVFromString(eventName),
          uintCV(Number(ticketPrice)),
          uintCV(Number(totalTickets)),
          uintCV(Number(maxResale))
        ],
        network: NETWORK
      };
      await doContractCall(txOptions);
      setSuccess(true);
      setEventName("");
      setTicketPrice("");
      setTotalTickets("");
      setMaxResale("");
    } catch (err) {
      setError('Error: ' + (err.message || err));
    }
  };

  // Fetch events created by this organizer
  useEffect(() => {
    const fetchMyEvents = async () => {
      // For demo: fetch all event IDs up to a max (should use event-counter from contract)
      const maxEvents = 20;
      const events = [];
      for (let i = 1; i <= maxEvents; i++) {
        try {
          const result = await fetchCallReadOnlyFunction({
            contractAddress: CONTRACT_ADDRESS,
            contractName: CONTRACT_NAME,
            functionName: 'get-event',
            functionArgs: [uintCV(i)],
            network: NETWORK,
            senderAddress: CONTRACT_ADDRESS,
          });
          const event = cvToJSON(result).value;
          // Only add if organizer matches current user
          if (event && event.organizer && isSignedIn && event.organizer.value === useWallet().userData.profile.stxAddress.testnet) {
            events.push({ id: i, ...event });
          }
        } catch {}
      }
  setMyEvents(events);
  console.log('Fetched events:', events);
    };
    if (isSignedIn) fetchMyEvents();
  }, [isSignedIn]);

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
          <Ticket className="text-orange-500 mb-4" size={40} />
          <h2 className="text-xl font-bold mb-2 text-gray-800">Connect Your Wallet</h2>
          <p className="text-gray-500 mb-6 text-center">You must connect your Stacks wallet to access your dashboard.</p>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold shadow"
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
            <span className="bg-orange-100 rounded px-2 py-1 text-orange-600">TrueTicket</span>
          </div>
          <nav className="flex gap-8 relative">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative px-2 py-1 text-gray-700 font-medium focus:outline-none"
              >
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1 h-1 bg-orange-400 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
          <button
            className="flex items-center gap-1 text-gray-500 hover:text-orange-500 transition"
            onClick={() => navigate('/')}
          >
            <LogOut size={20} />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Greeting */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            Hello There! <span className="text-2xl">👋</span>
          </h2>
          <p className="text-gray-500 text-lg">Take a look at your Events</p>
        </section>

        {/* Create Event Section (Modern UI) */}
        <section ref={sectionRefs["create-event"]} className="mb-12" id="create-event">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Create Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Ticket Price (in STX)"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Total Tickets"
                value={totalTickets}
                onChange={(e) => setTotalTickets(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Max Resale %"
                value={maxResale}
                onChange={(e) => setMaxResale(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold p-2 rounded shadow"
              >
                Create Event
              </button>
            </form>
            {success && <p className="text-green-600 mt-3">✅ Event created successfully!</p>}
            {error && <p className="text-red-600 mt-3">{error}</p>}
          </motion.div>
        </section>

        {/* Tickets Section */}
        <section ref={sectionRefs["mailroom"]} className="mb-12" id="mailroom">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="text-orange-500" size={20} />
              Tickets
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm">
                    <th className="py-2 px-4">Ticket ID</th>
                    <th className="py-2 px-4">Ticket name</th>
                    <th className="py-2 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2 px-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Virtual Address</span>
                    </td>
                    <td className="py-2 px-4">State Notification</td>
                    <td className="py-2 px-4">Yesterday</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Virtual Address</span>
                    </td>
                    <td className="py-2 px-4">State Notification</td>
                    <td className="py-2 px-4">2 days ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section ref={sectionRefs["profile"]} id="profile">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="text-orange-500" size={20} />
              Entity Profile
            </h3>
            <div className="text-gray-600">Profile details and settings go here.</div>
          </div>
        </section>
      </main>
    </div>
    
  );
}
