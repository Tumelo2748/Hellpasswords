import { useState } from 'react';
import { Link } from 'react-router-dom';

const ColorSequence = () => {
  const [colors, setColors] = useState(Array(6).fill('#000000'));
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState('');

  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
    
    // Check if all colors have been selected
    const allSelected = newColors.every(c => c !== '#000000');
    setIsValid(allSelected);
    
    if (allSelected) {
      // Generate password from hex codes
      const pass = newColors.join('');
      setPassword(pass);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                  Color Sequence Challenge
                </h2>

                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-4">
                    Select 6 colors in sequence. Your password will be created from the hex codes of your chosen colors.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {colors.map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-20 h-20 rounded-lg shadow-md mb-2"
                        style={{ backgroundColor: color }}
                      ></div>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="w-20 h-8"
                      />
                      <span className="text-xs mt-1 font-mono">{color}</span>
                    </div>
                  ))}
                </div>

                {isValid && (
                  <div className="mt-4">
                    <p className="text-green-500 font-semibold">Color sequence complete!</p>
                    <div className="bg-gray-100 p-4 rounded-md mt-2">
                      <p className="text-sm font-mono break-all">{password}</p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <Link
                    to="/"
                    className="text-pink-500 hover:text-pink-600 transition-colors"
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

export default ColorSequence;
