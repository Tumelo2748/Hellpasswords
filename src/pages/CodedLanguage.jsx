import { useState } from 'react';
import { Link } from 'react-router-dom';

const CodedLanguage = () => {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  const toPigLatin = (word) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    if (vowels.includes(word[0].toLowerCase())) {
      return word + 'way';
    }
    
    let consonantCluster = '';
    let i = 0;
    
    while (i < word.length && !vowels.includes(word[i].toLowerCase())) {
      consonantCluster += word[i];
      i++;
    }
    
    return word.slice(i) + consonantCluster + 'ay';
  };

  const validateInput = (text) => {
    // Convert to Pig Latin
    const words = text.split(' ');
    const pigLatinWords = words.map(toPigLatin);
    const pigLatin = pigLatinWords.join(' ');
    
    // Reverse the result
    const reversed = pigLatin.split('').reverse().join('');
    
    // Example validation: if input is "Login Time", it should become "emitoGniL"
    // This is a simplified validation - you might want to adjust based on your needs
    setIsValid(reversed.length > 0);
    return reversed;
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    
    if (text.trim() === '') {
      setError('Please enter some text');
      setIsValid(false);
      return;
    }
    
    try {
      const result = validateInput(text);
      setError('');
      document.getElementById('result').textContent = `Result: ${result}`;
    } catch (err) {
      setError('Invalid input format');
      setIsValid(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                  Coded Language Challenge
                </h2>

                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-4">
                    Enter a phrase to be converted to Pig Latin and reversed.
                    <br />
                    Example: "Login Time" becomes "emitoGniL"
                  </p>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your phrase"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                <div id="result" className="text-blue-600 font-mono mt-4"></div>

                {isValid && (
                  <p className="text-green-500 text-sm mt-2">
                    Successfully converted! Use the result as your password.
                  </p>
                )}

                <div className="mt-8 flex justify-between">
                  <Link
                    to="/"
                    className="text-green-500 hover:text-green-600 transition-colors"
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

export default CodedLanguage;
