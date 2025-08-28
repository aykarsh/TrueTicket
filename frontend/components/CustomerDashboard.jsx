
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Ticket, User, Search, CheckCircle, Repeat2, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Buy Ticket', id: 'buy-ticket' },
  { label: 'Resell Ticket', id: 'resell-ticket' },
  { label: 'Get Event Details', id: 'get-event' },
  { label: 'Get Ticket Owner', id: 'get-owner' },
];

const CustomerDashboard = () => {
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

  // Dummy handlers (replace with contract calls)
  const handleBuyTicket = (e) => {
    e.preventDefault();
    if (!buyEventId) return setBuyMsg('Event ID required');
    setBuyMsg('Ticket purchased! (simulate contract call)');
  };
  const handleResellTicket = (e) => {
    e.preventDefault();
    if (!resaleEventId || !resaleTicketId || !resaleNewPrice || !resaleNewBuyer)
      return setResaleMsg('All fields required');
    setResaleMsg('Ticket resold! (simulate contract call)');
  };
  const handleQueryEvent = (e) => {
    e.preventDefault();
    if (!queryEventId) return setEventDetails(null);
    setEventDetails({ id: queryEventId, name: 'Sample Event', price: '10', tickets: 100, sold: 5 });
  };
  const handleQueryTicketOwner = (e) => {
    e.preventDefault();
    if (!queryTicketEventId || !queryTicketId) return setTicketOwner(null);
    setTicketOwner('SP123...XYZ (simulate owner)');
  };

  const handleNavClick = (id) => {
    setActiveTab(id);
    sectionRefs[id].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <span className="bg-blue-100 rounded px-2 py-1 text-blue-600">TrueTicket</span>
            <span className="hidden sm:inline">Customer</span>
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
          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition">
            <LogOut size={20} />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            Mornin’ Customer! <span className="text-2xl">👋</span>
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
