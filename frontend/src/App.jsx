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

const App = () => {
  // Auth modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [signInRole, setSignInRole] = useState('Customer'); // 'Customer' or 'Organiser'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeSection, setActiveSection] = useState('Home');
  // Section refs for smooth scrolling
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
        {/* Navigation */}
        <motion.nav 
          className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800">TrueTicket</span>
              </motion.div>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {['Home', 'About Us', 'Features', 'Technology', 'Contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`bg-transparent border-0 p-0 m-0 text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none mx-2 ${
                      activeSection === item ? 'text-blue-600 font-bold underline underline-offset-8' : ''
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.button>
                ))}
                <motion.button
                  className="text-blue-600 font-semibold px-4 py-2 rounded hover:underline focus:outline-none bg-transparent border-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign In / Sign Up
                </motion.button>
              </div>
              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden bg-white border-t border-gray-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-4 py-4 space-y-3">
                  {['Home', 'About Us', 'Features', 'Technology', 'Contact'].map((item) => (
                    <motion.button
                      key={item}
                      type="button"
                      onClick={() => {
                        handleNavClick(item);
                        setIsMenuOpen(false);
                      }}
                      className="block bg-transparent border-0 p-0 m-0 text-gray-600 hover:text-gray-900 font-medium w-full text-left focus:outline-none"
                      whileHover={{ x: 10 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                  <motion.button
                    className="w-full text-blue-600 font-semibold px-4 py-2 rounded hover:underline focus:outline-none bg-transparent border-0 mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In / Sign Up
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Auth Modal - rendered once at top level */}
        <AnimatePresence>
          {showAuthModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-md mx-auto"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-10 relative">
                  {/* Close button */}
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                    onClick={() => setShowAuthModal(false)}
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <Star className="w-8 h-8 text-gray-900" />
                  </div>
                  {/* Tabs */}
                  <div className="flex justify-center mb-8 gap-2">
                    <button
                      className={`px-4 py-2 font-semibold rounded-l-lg transition-colors duration-150 ${authMode === 'signin' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setAuthMode('signin')}
                    >
                      Log in
                    </button>
                    <button
                      className={`px-4 py-2 font-semibold rounded-r-lg transition-colors duration-150 ${authMode === 'signup' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setAuthMode('signup')}
                    >
                      Sign up
                    </button>
                  </div>
                  {authMode === 'signin' ? (
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <div className="relative">
                          <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="hello@oliviarhye.com" />
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="••••••••" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-gray-700 text-sm">
                          <input type="checkbox" className="rounded border-gray-300 focus:ring-blue-500" />
                          Remember me
                        </label>
                        <button type="button" className="text-blue-600 hover:underline text-sm font-medium">Forgot password?</button>
                      </div>
                      <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition">Log in</button>
                      <div className="text-center text-gray-500 text-sm mt-4">
                        Don’t have an account?{' '}
                        <button type="button" className="text-blue-600 hover:underline font-medium" onClick={() => setAuthMode('signup')}>Sign up</button>
                      </div>
                    </form>
                  ) : (
                    <form className="space-y-6">
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="example@email.com" />
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Create a password</label>
                        <input type="password" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="must be 8 characters" />
                      </div>
                      <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition">Sign up</button>
                      <div className="text-center text-gray-500 text-sm mt-4">
                        Already have an account?{' '}
                        <button type="button" className="text-blue-600 hover:underline font-medium" onClick={() => setAuthMode('signin')}>Log in</button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
  {/* Hero Section */}
  <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
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
              >
                Launch TrueTicket App
              </motion.button>
              <motion.button
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
        {/* Footer Section */}
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
}
export default App;