import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Tone from 'tone';

const AudioFrequency = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [frequencies, setFrequencies] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize Tone.js
    const analyzer = new Tone.Analyser('fft', 1024);
    const mic = new Tone.UserMedia().connect(analyzer);

    return () => {
      mic.close();
      analyzer.dispose();
    };
  }, []);

  const startRecording = async () => {
    try {
      await Tone.start();
      const mic = new Tone.UserMedia();
      await mic.open();
      
      const analyzer = new Tone.Analyser('fft', 1024);
      mic.connect(analyzer);

      setIsRecording(true);
      setFrequencies([]);

      // Record for 3 seconds
      const recordingInterval = setInterval(() => {
        const frequency = Math.round(getHighestFrequency(analyzer.getValue()));
        if (frequency > 0) {
          setFrequencies(prev => [...prev, frequency]);
        }
      }, 500);

      setTimeout(() => {
        clearInterval(recordingInterval);
        stopRecording(mic);
      }, 3000);

    } catch (err) {
      setError('Please allow microphone access to use this feature');
    }
  };

  const stopRecording = (mic) => {
    mic.close();
    setIsRecording(false);
    
    if (frequencies.length >= 6) {
      generatePassword(frequencies);
      setIsValid(true);
    } else {
      setError('Please provide at least 6 distinct notes');
      setIsValid(false);
    }
  };

  const getHighestFrequency = (frequencyData) => {
    let maxIndex = 0;
    let maxValue = -Infinity;
    
    for (let i = 0; i < frequencyData.length; i++) {
      if (frequencyData[i] > maxValue) {
        maxValue = frequencyData[i];
        maxIndex = i;
      }
    }
    
    // Convert FFT bin to frequency
    return maxIndex * (Tone.context.sampleRate / 2048);
  };

  const generatePassword = (freqs) => {
    // Convert frequencies to musical notes and create password
    const pass = freqs
      .map(freq => Math.round(freq))
      .slice(0, 6)  // Take only first 6 frequencies
      .join('');
    
    setPassword(pass);
  };

  const getRecordingStatus = () => {
    if (isRecording) {
      return 'Recording... Keep humming or whistling';
    }
    if (frequencies.length > 0) {
      return `Recorded ${frequencies.length} frequencies`;
    }
    return 'Click to start recording';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                  Audio Frequency Challenge
                </h2>

                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-4">
                    Hum or whistle a tune with at least 6 distinct notes.
                    The frequency data will be converted into your unique password.
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-6">
                  <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className={`w-32 h-32 rounded-full flex items-center justify-center text-white transition-all ${
                      isRecording
                        ? 'bg-red-500 animate-pulse'
                        : 'bg-indigo-500 hover:bg-indigo-600'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-8 h-8 mx-auto ${
                        isRecording ? 'bg-white' : 'bg-red-500'
                      } rounded-full`}></div>
                      <span className="text-sm mt-2 block">
                        {isRecording ? 'Recording...' : 'Start'}
                      </span>
                    </div>
                  </button>

                  <p className="text-sm text-gray-600">
                    {getRecordingStatus()}
                  </p>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  {frequencies.length > 0 && (
                    <div className="w-full bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between space-x-2">
                        {frequencies.slice(0, 6).map((freq, index) => (
                          <div
                            key={index}
                            className="w-8 bg-indigo-500"
                            style={{ height: `${Math.min(freq / 100, 64)}px` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isValid && (
                    <div className="mt-4 w-full">
                      <p className="text-green-500 font-semibold">Recording complete!</p>
                      <div className="bg-gray-100 p-4 rounded-md mt-2">
                        <p className="text-sm font-mono break-all">
                          Your password: {password}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <Link
                    to="/"
                    className="text-purple-500 hover:text-purple-600 transition-colors"
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

export default AudioFrequency;
