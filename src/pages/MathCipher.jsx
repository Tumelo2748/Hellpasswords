import { useState } from 'react';
import { Link } from 'react-router-dom';

const MathCipher = () => {
  const [sequence, setSequence] = useState('');
  const [squareRoot, setSquareRoot] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const evaluateExpression = (expr) => {
    try {
      // Using Function constructor to safely evaluate mathematical expressions
      return new Function(`return ${expr}`)();
    } catch (error) {
      throw new Error('Invalid mathematical expression');
    }
  };

  const validateInput = () => {
    try {
      if (!sequence || !squareRoot) {
        setError('Please fill in both fields');
        setIsValid(false);
        return;
      }

      // Evaluate the sequence
      const sequenceResult = evaluateExpression(sequence);
      
      // Validate and calculate square root
      const sqrtNum = parseInt(squareRoot);
      if (isNaN(sqrtNum) || sqrtNum < 0) {
        throw new Error('Invalid square root number');
      }
      const sqrtResult = Math.sqrt(sqrtNum);

      // Combine results
      const finalResult = `${Math.round(sequenceResult)}${Math.round(sqrtResult)}`;
      setResult(finalResult);
      setIsValid(true);
      setError('');
    } catch (err) {
      setError(err.message);
      setIsValid(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                  Math Cipher Challenge
                </h2>

                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-4">
                    Create a password by:
                    <ol className="list-decimal ml-5 mt-2">
                      <li>Solving a math sequence (e.g., (4+5)*3-6)</li>
                      <li>Finding a square root (e.g., √81)</li>
                      <li>Combining the results</li>
                    </ol>
                    Example: (4+5)*3-6 and √81 becomes "27109"
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Math Sequence
                    </label>
                    <input
                      type="text"
                      value={sequence}
                      onChange={(e) => setSequence(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="(4+5)*3-6"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Square Root Number
                    </label>
                    <input
                      type="number"
                      value={squareRoot}
                      onChange={(e) => setSquareRoot(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="81"
                    />
                  </div>

                  <button
                    onClick={validateInput}
                    className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Calculate Password
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                {isValid && (
                  <div className="mt-4">
                    <p className="text-green-500 font-semibold">Password generated!</p>
                    <p className="text-lg font-mono mt-2">Result: {result}</p>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <Link
                    to="/"
                    className="text-yellow-500 hover:text-yellow-600 transition-colors"
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

export default MathCipher;
