import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TimeSyncedChaos = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [palindrome, setPalindrome] = useState('');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Set current date in YYYYMMDD format
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setCurrentDate(`${year}${month}${day}`);
  }, []);

  const isPalindrome = (str) => {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
  };

  const validateInputs = () => {
    // Validate palindrome
    if (!palindrome) {
      setError('Please enter a palindrome word');
      return false;
    }
    if (!isPalindrome(palindrome)) {
      setError('The word must be a palindrome (reads the same forwards and backwards)');
      return false;
    }

    // Validate phone digits
    if (!phoneDigits) {
      setError('Please enter the last 3 digits of your phone number');
      return false;
    }
    if (!/^\d{3}$/.test(phoneDigits)) {
      setError('Please enter exactly 3 digits');
      return false;
    }

    setError('');
    return true;
  };

  const generatePassword = () => {
    if (validateInputs()) {
      // Reverse phone digits
      const reversedDigits = phoneDigits.split('').reverse().join('');
      
      // Combine all parts
      const newPassword = `${currentDate}${palindrome}${reversedDigits}`;
      setPassword(newPassword);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                  Time-Synced Chaos Challenge
                </h2>

                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-4">
                    Create a password by combining:
                    <ul className="list-disc ml-5 mt-2">
                      <li>Current date (auto-filled)</li>
                      <li>A palindrome word</li>
                      <li>Last 3 digits of your phone number in reverse</li>
                    </ul>
                    Example: 20241128Racecar472
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Date
                    </label>
                    <input
                      type="text"
                      value={currentDate}
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Palindrome Word
                    </label>
                    <input
                      type="text"
                      value={palindrome}
                      onChange={(e) => setPalindrome(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., Racecar"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last 3 Phone Digits
                    </label>
                    <input
                      type="text"
                      value={phoneDigits}
                      onChange={(e) => setPhoneDigits(e.target.value)}
                      maxLength={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., 274"
                    />
                  </div>

                  <button
                    onClick={generatePassword}
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Generate Password
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                {isValid && (
                  <div className="mt-4">
                    <p className="text-green-500 font-semibold">Password generated!</p>
                    <div className="bg-gray-100 p-4 rounded-md mt-2">
                      <p className="text-sm font-mono break-all">
                        Your password: {password}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <Link
                    to="/"
                    className="text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    ← Back to Challenges
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSyncedChaos;
