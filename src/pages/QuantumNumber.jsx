import { useState } from 'react';
import { Link } from 'react-router-dom';

const QuantumNumber = () => {
  const [combinations, setCombinations] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  const principalNumbers = Array.from({ length: 7 }, (_, i) => i + 1);
  const orbitalShapes = ['s', 'p', 'd', 'f'];
  const magneticNumbers = Array.from({ length: 7 }, (_, i) => i - 3);

  const addCombination = (n, l, m) => {
    // Validate the combination
    if (l === 's' && Math.abs(m) > 0) {
      setError('s orbital can only have m = 0');
      return;
    }
    if (l === 'p' && Math.abs(m) > 1) {
      setError('p orbital can only have m = -1, 0, 1');
      return;
    }
    if (l === 'd' && Math.abs(m) > 2) {
      setError('d orbital can only have m = -2, -1, 0, 1, 2');
      return;
    }

    const newCombination = { n, l, m };
    setCombinations([...combinations, newCombination]);
    setError('');

    // Check if we have at least 3 valid combinations
    if (combinations.length >= 2) {  // Will become 3 after adding this one
      setIsValid(true);
    }
  };

  const removeCombination = (index) => {
    const newCombinations = combinations.filter((_, i) => i !== index);
    setCombinations(newCombinations);
    setIsValid(newCombinations.length >= 3);
  };

  const getPassword = () => {
    return combinations.map(c => `${c.n}${c.l}${c.m >= 0 ? '+' : ''}${c.m}`).join('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                  Quantum Number Challenge
                </h2>

                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-4">
                    Create at least 3 quantum number combinations using:
                    <ul className="list-disc ml-5 mt-2">
                      <li>Principal Quantum Number (n): 1-7</li>
                      <li>Orbital Shape (l): s, p, d, f</li>
                      <li>Magnetic Number (m): -3 to +3</li>
                    </ul>
                    Example: 3p+2
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <select
                    className="border rounded-md p-2"
                    onChange={(e) => {
                      const n = parseInt(e.target.value);
                      const l = document.getElementById('orbital').value;
                      const m = parseInt(document.getElementById('magnetic').value);
                      addCombination(n, l, m);
                    }}
                  >
                    <option value="">Select n</option>
                    {principalNumbers.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>

                  <select
                    id="orbital"
                    className="border rounded-md p-2"
                    onChange={(e) => {
                      const n = parseInt(document.getElementById('principal').value);
                      const l = e.target.value;
                      const m = parseInt(document.getElementById('magnetic').value);
                      addCombination(n, l, m);
                    }}
                  >
                    <option value="">Select l</option>
                    {orbitalShapes.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>

                  <select
                    id="magnetic"
                    className="border rounded-md p-2"
                    onChange={(e) => {
                      const n = parseInt(document.getElementById('principal').value);
                      const l = document.getElementById('orbital').value;
                      const m = parseInt(e.target.value);
                      addCombination(n, l, m);
                    }}
                  >
                    <option value="">Select m</option>
                    {magneticNumbers.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                <div className="space-y-2">
                  {combinations.map((combo, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                    >
                      <span className="font-mono">
                        {combo.n}{combo.l}{combo.m >= 0 ? '+' : ''}{combo.m}
                      </span>
                      <button
                        onClick={() => removeCombination(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {isValid && (
                  <div className="mt-4">
                    <p className="text-green-500 font-semibold">Valid combination created!</p>
                    <div className="bg-gray-100 p-4 rounded-md mt-2">
                      <p className="text-sm font-mono">
                        Your password: {getPassword()}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <Link
                    to="/"
                    className="text-teal-500 hover:text-teal-600 transition-colors"
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

export default QuantumNumber;
