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

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DEMO_ID = 'demo@trueticket.com';
const DEMO_PASSWORD = 'demopass123';

const LandingPage = () => {
  // All landing page state and logic
  const navigate = useNavigate();
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [signInRole, setSignInRole] = useState('Customer');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeSection, setActiveSection] = useState('Home');
  const whyChooseRef = useRef(null);
  const howWorksRef = useRef(null);
  const techRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);

  // Scroll handler
  const handleNavClick = (item) => {
    if (item === 'About Us' && whyChooseRef.current) {
      whyChooseRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'Features' && howWorksRef.current) {
      howWorksRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'Technology' && techRef.current) {
      techRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'Contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(item);
    if (item === 'Home' && homeRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Highlight nav item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 100;
      if (homeRef.current && scrollY < (whyChooseRef.current?.offsetTop || 0) - offset) {
        setActiveSection('Home');
      } else if (whyChooseRef.current && scrollY >= (whyChooseRef.current.offsetTop - offset) && scrollY < (howWorksRef.current?.offsetTop || 0) - offset) {
        setActiveSection('About Us');
      } else if (howWorksRef.current && scrollY >= (howWorksRef.current.offsetTop - offset) && scrollY < (techRef.current?.offsetTop || 0) - offset) {
        setActiveSection('Features');
      } else if (techRef.current && scrollY >= (techRef.current.offsetTop - offset) && scrollY < (contactRef.current?.offsetTop || 0) - offset) {
        setActiveSection('Technology');
      } else if (contactRef.current && scrollY >= (contactRef.current.offsetTop - offset)) {
        setActiveSection('Contact');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    { name: "Sarah Martinez", role: "Event Organizer", rating: 5 },
    { name: "David Chen", role: "Concert Promoter", rating: 5 },
    { name: "Emma Johnson", role: "Festival Director", rating: 5 }
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const ticketVariants = {
    initial: { x: -100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 1.2, delay: 0.5 }
    },
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50" ref={homeRef}>
      {/* Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Ticket className="w-7 h-7 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">TrueTicket</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {['Home', 'About Us', 'Features', 'Technology', 'Contact'].map((item) => (
              <button
                key={item}
                className={`font-medium text-gray-700 hover:text-purple-600 transition-colors px-2 py-1 ${activeSection === item ? 'border-b-2 border-purple-600' : ''}`}
                onClick={() => handleNavClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-purple-600 hover:to-blue-600 transition-all"
              onClick={() => { setShowAuthModal(true); setAuthMode('signin'); }}
            >
              Sign In
            </button>
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 px-4 py-4 shadow-lg flex flex-col space-y-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {['Home', 'About Us', 'Features', 'Technology', 'Contact'].map((item) => (
                <button
                  key={item}
                  className={`font-medium text-gray-700 hover:text-purple-600 transition-colors px-2 py-1 text-left ${activeSection === item ? 'border-l-4 border-purple-600' : ''}`}
                  onClick={() => { handleNavClick(item); setIsMenuOpen(false); }}
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                onClick={() => setShowAuthModal(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="mb-6 flex justify-center">
                <Ticket className="w-10 h-10 text-purple-600" />
              </div>
              <div className="flex justify-center mb-6">
                <button
                  className={`px-4 py-2 rounded-l-full font-semibold ${authMode === 'signin' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setAuthMode('signin')}
                >Sign In</button>
                <button
                  className={`px-4 py-2 rounded-r-full font-semibold ${authMode === 'signup' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setAuthMode('signup')}
                >Sign Up</button>
              </div>
              {authMode === 'signin' ? (
                <div>
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Role</label>
                    <select
                      className="w-full border rounded-lg px-3 py-2"
                      value={signInRole}
                      onChange={e => setSignInRole(e.target.value)}
                    >
                      <option>Customer</option>
                      <option>Organizer</option>
                    </select>
                  </div>
                  <input
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    placeholder="Email"
                    value={signInEmail}
                    onChange={e => setSignInEmail(e.target.value)}
                  />
                  <input
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    placeholder="Password"
                    type="password"
                    value={signInPassword}
                    onChange={e => setSignInPassword(e.target.value)}
                  />
                  <button
                    className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all"
                    onClick={() => {
                      if (signInEmail === DEMO_ID && signInPassword === DEMO_PASSWORD) {
                        setShowAuthModal(false);
                        setTimeout(() => {
                          if (signInRole === 'Organizer') {
                            navigate('/organizer-dashboard');
                          } else {
                            navigate('/customer-dashboard');
                          }
                        }, 200);
                      } else {
                        alert('Invalid credentials. Try demo@trueticket.com / demopass123 for demo access.');
                      }
                    }}
                  >
                    Sign In
                  </button>
                  <div className="text-xs text-gray-500 mt-2 text-center">Demo: demo@trueticket.com / demopass123</div>
                </div>
              ) : (
                <div>
                  <input className="w-full border rounded-lg px-3 py-2 mb-4" placeholder="Name" />
                  <input
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    placeholder="Email"
                    value={signInEmail}
                    onChange={e => setSignInEmail(e.target.value)}
                  />
                  <input
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    placeholder="Password"
                    type="password"
                    value={signInPassword}
                    onChange={e => setSignInPassword(e.target.value)}
                  />
                  <button
                    className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all"
                    onClick={() => {
                      if (signInEmail === DEMO_ID && signInPassword === DEMO_PASSWORD) {
                        setShowAuthModal(false);
                        setTimeout(() => {
                          if (signInRole === 'Organizer') {
                            navigate('/organizer-dashboard');
                          } else {
                            navigate('/customer-dashboard');
                          }
                        }, 200);
                      } else {
                        alert('For demo, use demo@trueticket.com / demopass123. (No real sign up logic implemented)');
                      }
                    }}
                  >
                    Sign Up
                  </button>
                  <div className="text-xs text-gray-500 mt-2 text-center">Demo: demo@trueticket.com / demopass123</div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Fraud-Proof Events,{' '}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  Authentic Tickets
                </motion.span>
              </motion.h1>
              <span className="text-gray-600 font-medium">500+ (4.9 Reviews)</span>
            </motion.div>
            {/* Right Content - NFT Ticket Card */}
            <motion.div
              className="relative"
              variants={ticketVariants}
              initial="initial"
              animate={["animate", "float"]}
            >
              <div className="relative bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-3xl overflow-hidden shadow-2xl p-8">
                {/* Blockchain pattern background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-6 gap-2 h-full p-4">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-white/20 rounded-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ 
                          duration: 2, 
                          delay: i * 0.1, 
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* NFT Ticket Card */}
                <motion.div 
                  className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  whileHover={{ scale: 1.02, rotateX: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Ticket Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Ticket className="w-6 h-6 text-white" />
                      <span className="text-white font-bold text-lg">NFT Event Ticket</span>
                    </div>
                    <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      VERIFIED
                    </div>
                  </div>
                  {/* Event Details */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">The Weeknd Live</h3>
                    <p className="text-white/80 mb-2">Madison Square Garden</p>
                    <p className="text-white/80">December 15, 2024 • 8:00 PM</p>
                  </div>
                  {/* Price and Blockchain Info */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-white">
                      <span className="text-2xl font-bold">0.5 STX</span>
                      <p className="text-sm text-white/80">≈ $25.00</p>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <Shield className="w-4 h-4 mr-2" />
                      <span>Blockchain Verified</span>
                    </div>
                  </div>
                  {/* Token Information */}
                  <div className="space-y-2 text-sm text-white/90">
                    <div className="flex justify-between">
                      <span>Token ID:</span>
                      <span className="font-mono">#1247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Event ID:</span>
                      <span className="font-mono">#42</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contract:</span>
                      <span className="font-mono text-xs">SP2J...XY9Z</span>
                    </div>
                  </div>
                  {/* QR Code placeholder */}
                  <div className="mt-6 flex justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Coins className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" ref={whyChooseRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose TrueTicket?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of event ticketing with blockchain-powered NFT tickets
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Fraud-Proof Tickets",
                description: "Each ticket is a unique NFT on Stacks blockchain, making counterfeiting impossible",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: "Full Transparency",
                description: "All ticket information is publicly verifiable on the blockchain with real-time queries",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Instant Transfers",
                description: "Transfer tickets instantly to anyone with a Stacks wallet address",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: <Coins className="w-8 h-8" />,
                title: "Direct Payments",
                description: "Event organizers receive payments directly in STX with no middleman fees",
                color: "from-green-500 to-teal-500"
              },
              {
                icon: <QrCode className="w-8 h-8" />,
                title: "Easy Verification",
                description: "Quick QR code scanning for instant ticket verification at events",
                color: "from-red-500 to-pink-500"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Smart Contracts",
                description: "Built with Clarity smart contracts ensuring secure and transparent operations",
                color: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50" ref={howWorksRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How TrueTicket Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to create, buy, and verify authentic blockchain tickets
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">1</div>
              <h3 className="text-xl font-bold mb-3">Create Event</h3>
              <p className="text-gray-600">Event organizers connect their Stacks wallet and create events with pricing and ticket limits stored on-chain.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">2</div>
              <h3 className="text-xl font-bold mb-3">Purchase NFT Tickets</h3>
              <p className="text-gray-600">Users browse events, pay in STX, and receive unique SIP-009 compliant NFT tickets minted on the blockchain.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">3</div>
              <h3 className="text-xl font-bold mb-3">Verify & Attend</h3>
              <p className="text-gray-600">At the event, tickets are verified instantly through blockchain lookup and QR scanning with cryptographic proof.</p>
            </motion.div>
          </div>
          {/* Technology Stack */}
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            ref={techRef}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Built on Modern Technology</h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start space-x-3">
                    <Database className="w-5 h-5 mt-1 text-purple-500" />
                    <div>
                      <strong className="text-gray-900">Stacks Blockchain:</strong> Clarity smart contracts with SIP-009 NFT standard compliance
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Code className="w-5 h-5 mt-1 text-blue-500" />
                    <div>
                      <strong className="text-gray-900">React + Express:</strong> Modern full-stack architecture with Tailwind CSS
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 mt-1 text-green-500" />
                    <div>
                      <strong className="text-gray-900">Cryptographic Security:</strong> Immutable ownership tracking and fraud prevention
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 mt-1 text-orange-500" />
                    <div>
                      <strong className="text-gray-900">Stacks.js Integration:</strong> Seamless wallet connectivity and transaction handling
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-mono text-sm bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto">
                <div className="text-purple-400">;; Create Event Function</div>
                <div className="text-cyan-400">(define-public (create-event</div>
                <div className="ml-4 text-yellow-400">(name (string-ascii 50))</div>
                <div className="ml-4 text-yellow-400">(price uint)</div>
                <div className="ml-4 text-yellow-400">(total-tickets uint))</div>
                <div className="ml-2 text-white">(let ((event-id (+ (var-get next-event-id) u1)))</div>
                <div className="ml-4 text-green-400">(map-set events event-id</div>
                <div className="ml-6 text-blue-400">{'{'} name: name,</div>
                <div className="ml-8 text-blue-400">price: price,</div>
                <div className="ml-8 text-blue-400">available: total-tickets {'}'}</div>
                <div className="ml-4 text-green-400">)</div>
                <div className="ml-2 text-cyan-400">(ok event-id)))</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Experience Fraud-Proof Ticketing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the revolution and start creating or buying authentic blockchain tickets today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setShowAuthModal(true); setAuthMode('signin'); }}
              >
                View Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12" ref={contactRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">TrueTicket</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-600">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <QrCode className="w-4 h-4" />
                <span className="text-sm">Blockchain Verified</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1-800-TRUETICKET</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@trueticket.com</span>
              </motion.div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>&copy; 2024 TrueTicket. Built on Stacks Blockchain. Fraud-proof ticketing revolution.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;