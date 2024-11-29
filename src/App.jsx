import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

// Import pages
import AlgorithmicPassword from './pages/AlgorithmicPassword'
import ShapePattern from './pages/ShapePattern'
import CodedLanguage from './pages/CodedLanguage'
import MathCipher from './pages/MathCipher'
import ColorSequence from './pages/ColorSequence'
import AnimatedGesture from './pages/AnimatedGesture'
import QuantumNumber from './pages/QuantumNumber'
import AudioFrequency from './pages/AudioFrequency'
import InteractiveCryptogram from './pages/InteractiveCryptogram'
import TimeSyncedChaos from './pages/TimeSyncedChaos'

const cardVariants = {
  initial: { scale: 0.96, y: 20, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: { scale: 0.98 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function App() {
  const challenges = [
    { 
      path: "/algorithmic",
      name: "Algorithmic Password",
      description: "Create passwords using Fibonacci numbers and movie initials",
      gradient: "from-pink-500 to-rose-500"
    },
    { 
      path: "/shape-pattern",
      name: "Shape Pattern",
      description: "Arrange shapes in a specific pattern to unlock",
      gradient: "from-purple-500 to-indigo-500"
    },
    { 
      path: "/coded-language",
      name: "Coded Language",
      description: "Transform text using Pig Latin and reversals",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      path: "/math-cipher",
      name: "Math Cipher",
      description: "Solve mathematical sequences for your password",
      gradient: "from-teal-500 to-emerald-500"
    },
    { 
      path: "/color-sequence",
      name: "Color Sequence",
      description: "Create passwords from color combinations",
      gradient: "from-green-500 to-lime-500"
    },
    { 
      path: "/animated-gesture",
      name: "Animated Gesture",
      description: "Draw patterns to generate unique passwords",
      gradient: "from-yellow-500 to-amber-500"
    },
    { 
      path: "/quantum-number",
      name: "Quantum Number",
      description: "Use quantum mechanics principles for passwords",
      gradient: "from-orange-500 to-red-500"
    },
    { 
      path: "/audio-frequency",
      name: "Audio Frequency",
      description: "Hum or whistle to create your password",
      gradient: "from-red-500 to-pink-500"
    },
    { 
      path: "/cryptogram",
      name: "Interactive Cryptogram",
      description: "Decrypt messages to reveal passwords",
      gradient: "from-violet-500 to-purple-500"
    },
    { 
      path: "/time-synced",
      name: "Time-Synced Chaos",
      description: "Combine time, palindromes, and phone numbers",
      gradient: "from-fuchsia-500 to-pink-500"
    },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/">
                  <motion.span 
                    className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    HellPasswords
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-7xl mx-auto px-4">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="py-8">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-12"
                    >
                      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                        HellPasswords
                      </h1>
                      <p className="text-gray-400 text-lg md:text-xl">
                        Choose your password challenge
                      </p>
                    </motion.div>

                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {challenges.map((item, index) => (
                        <motion.div
                          key={item.path}
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Link to={item.path}>
                            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${item.gradient} p-[2px]`}>
                              <div className="relative bg-gray-900 rounded-[10px] p-6 h-full">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent blur-lg"></div>
                                <h2 className="text-xl font-semibold mb-2 relative">{item.name}</h2>
                                <p className="text-gray-400 text-sm relative">{item.description}</p>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                }
              />
              <Route path="/algorithmic" element={<AlgorithmicPassword />} />
              <Route path="/shape-pattern" element={<ShapePattern />} />
              <Route path="/coded-language" element={<CodedLanguage />} />
              <Route path="/math-cipher" element={<MathCipher />} />
              <Route path="/color-sequence" element={<ColorSequence />} />
              <Route path="/animated-gesture" element={<AnimatedGesture />} />
              <Route path="/quantum-number" element={<QuantumNumber />} />
              <Route path="/audio-frequency" element={<AudioFrequency />} />
              <Route path="/cryptogram" element={<InteractiveCryptogram />} />
              <Route path="/time-synced" element={<TimeSyncedChaos />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App
