import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AlgorithmicPassword = () => {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }).replace(':', ''));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const validatePassword = (input) => {
    // First three Fibonacci numbers: 1,1,2
    const fib = '112';
    
    // Check if starts with Fibonacci numbers
    if (!input.startsWith(fib)) {
      setError('Password must start with first three Fibonacci numbers (112)');
      return false;
    }

    // Check if the middle part contains exactly 2-3 uppercase letters (movie initials)
    const movieInitials = input.slice(3, -4);
    if (!/^[A-Z]{2,3}$/.test(movieInitials)) {
      setError('Password must contain 2-3 uppercase letters for movie initials');
      return false;
    }

    // Check if ends with valid time format
    const timepart = input.slice(-4);
    if (!/^\d{4}$/.test(timepart)) {
      setError('Password must end with time in HHMM format');
      return false;
    }

    setError('');
    return true;
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setIsValid(validatePassword(input));
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg mx-auto"
        >
          <div className="relative px-4 py-8 md:px-8 md:py-12 bg-gray-800 shadow-lg rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-700">
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                    Algorithmic Password
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base">Create a unique password using patterns</p>
                </div>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-gray-900 p-4 md:p-6 rounded-xl border border-gray-700"
                  >
                    <h3 className="font-semibold mb-2 text-purple-400">Password Rules:</h3>
                    <ul className="list-disc ml-5 space-y-2 text-sm">
                      <li className="text-gray-300">Start with first three Fibonacci numbers (112)</li>
                      <li className="text-gray-300">Add the initials of your favorite movie title</li>
                      <li className="text-gray-300">End with current time: {currentTime}</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-gray-900 p-3 md:p-4 rounded-xl border border-gray-700"
                  >
                    <p className="text-sm text-gray-400">Example: 112TSI0925</p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={password}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {isValid && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      )}
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {error}
                    </motion.p>
                  )}

                  {isValid && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-900/30 border border-green-700 p-4 rounded-lg"
                    >
                      <p className="text-green-400 font-semibold">Password is valid! ✨</p>
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-6"
                >
                  <Link
                    to="/"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Challenges
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlgorithmicPassword;
