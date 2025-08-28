import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Ticket, LogOut, Calendar, FileText, MapPin } from 'lucide-react';

const NAV_ITEMS = [
  { label: "Create Event", id: "create-event" },
  { label: "Tickets", id: "mailroom" },
  { label: "Profile", id: "profile" },
];

export default function OrganizerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create-event");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const sectionRefs = {
    "create-event": useRef(null),
    mailroom: useRef(null),
    profile: useRef(null),
  };

  const handleNavClick = (id) => {
    setActiveTab(id);
    sectionRefs[id].current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    setEventName("");
    setEventDate("");
    setEventLocation("");
    setEventDescription("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col">
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
            Mornin’ Organizer! <span className="text-2xl">👋</span>
          </h2>
          <p className="text-gray-500 text-lg">Take a look at your Events</p>
        </section>

        {/* Create Event Section */}
        <section ref={sectionRefs["create-event"]} className="mb-12" id="create-event">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
              <PlusCircle className="text-orange-500" size={24} />
              Create New Event
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Event Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Description</label>
                <textarea
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded shadow"
                type="submit"
              >
                Create Event
              </motion.button>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 text-center mt-2"
                >
                  Event created successfully!
                </motion.div>
              )}
            </form>
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
