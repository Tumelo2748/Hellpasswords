import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimatedGesture = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [path, setPath] = useState([]);
  const [gestures, setGestures] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;
    
    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = getCoordinates(e);
    setIsDrawing(true);
    setPath([[offsetX, offsetY]]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const { offsetX, offsetY } = getCoordinates(e);
    setPath(prev => [...prev, [offsetX, offsetY]]);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#4F46E5';
    
    ctx.beginPath();
    ctx.moveTo(path[path.length - 1][0], path[path.length - 1][1]);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    return { offsetX, offsetY };
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    if (path.length > 10) {  // Minimum points for a gesture
      const gesture = analyzeGesture(path);
      setGestures(prev => [...prev, gesture]);
      generatePassword([...gestures, gesture]);
    }
    
    // Clear canvas for next gesture
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPath([]);
  };

  const analyzeGesture = (points) => {
    // Simple gesture analysis
    const startPoint = points[0];
    const endPoint = points[points.length - 1];
    const dx = endPoint[0] - startPoint[0];
    const dy = endPoint[1] - startPoint[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = points.length;
    
    return {
      direction: Math.atan2(dy, dx),
      distance: distance,
      duration: duration,
      complexity: points.length
    };
  };

  const generatePassword = (allGestures) => {
    if (allGestures.length >= 3) {  // Require at least 3 gestures
      const pass = allGestures.map(g => 
        Math.round(g.direction * 100) +
        Math.round(g.distance) +
        g.duration
      ).join('');
      
      setPassword(pass);
      setIsValid(true);
    }
  };

  const clearGestures = () => {
    setGestures([]);
    setPassword('');
    setIsValid(false);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                  Animated Gesture Challenge
                </h2>

                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-4">
                    Draw at least 3 gestures. Your password will be generated from the patterns you create.
                    Each gesture should include loops, swipes, or pauses.
                  </p>
                </div>

                <div className="flex justify-center mb-8">
                  <motion.canvas
                    ref={canvasRef}
                    className="border-2 border-gray-300 rounded-lg shadow-md"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={endDrawing}
                    onMouseLeave={endDrawing}
                    whileHover={{ scale: 1.02 }}
                  />
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={clearGestures}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Gestures recorded: {gestures.length}/3
                  </p>
                </div>

                {isValid && (
                  <div className="mt-4">
                    <p className="text-green-500 font-semibold">Gesture sequence complete!</p>
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
                    className="text-blue-500 hover:text-blue-600 transition-colors"
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

export default AnimatedGesture;
