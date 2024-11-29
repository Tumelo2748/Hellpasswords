import { useState } from 'react';
import { Link } from 'react-router-dom';

const InteractiveCryptogram = () => {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [hint, setHint] = useState(false);

  const encryptedMessage = 'Uifsf jt b tfdsfu dpef jo zpvs ifbsu';
  const correctAnswer = 'There is a secret code in your heart';

  const shiftLetter = (letter, shift) => {
    if (!/[a-zA-Z]/.test(letter)) return letter;
    
    const isUpperCase = letter === letter.toUpperCase();
    const baseCharCode = isUpperCase ? 65 : 97;
    const letterCode = letter.charCodeAt(0) - baseCharCode;
    const shiftedCode = (letterCode + shift + 26) % 26;
    
    return String.fromCharCode(baseCharCode + shiftedCode);
  };

  const decrypt = (text, shift) => {
    return text
      .split('')
      .map(char => shiftLetter(char, shift))
      .join('');
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    
    if (text.toLowerCase() === correctAnswer.toLowerCase()) {
      setIsValid(true);
      setError('');
    } else {
      setIsValid(false);
      if (text.length > 0) {
        setError('Keep trying! The message is encrypted by shifting each letter back by 1.');
      }
    }
  };

  const showHintExample = () => {
    setHint(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                  Interactive Cryptogram Challenge
                </h2>

                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-4">
                    Decrypt this message to create your password:
                    <div className="bg-gray-100 p-4 rounded-md mt-2 font-mono text-lg">
                      {encryptedMessage}
                    </div>
                  </p>
                  <p className="text-sm text-gray-500">
                    Hint: Each letter is shifted back by 1 in the alphabet
                  </p>
                </div>

                <div className="mb-4">
                  <button
                    onClick={showHintExample}
                    className="text-sm text-teal-500 hover:text-teal-600 mb-2"
                  >
                    Show hint example
                  </button>
                  
                  {hint && (
                    <div className="bg-gray-50 p-4 rounded-md text-sm mb-4">
                      <p>Example shift:</p>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>'B' shifted back by 1 becomes 'A'</li>
                        <li>'Z' shifted back by 1 becomes 'Y'</li>
                        <li>'b' shifted back by 1 becomes 'a'</li>
                      </ul>
                    </div>
                  )}

                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter decrypted message"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                {isValid && (
                  <div className="mt-4">
                    <p className="text-green-500 font-semibold">
                      Congratulations! You've decrypted the message correctly!
                    </p>
                    <div className="bg-gray-100 p-4 rounded-md mt-2">
                      <p className="text-sm font-mono">
                        Your password: {input}
                      </p>
                    </div>
                  </div>
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

export default InteractiveCryptogram;
