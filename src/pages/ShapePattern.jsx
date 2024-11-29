import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SHAPES = {
  TRIANGLE: 'triangle',
  SQUARE: 'square',
  CIRCLE: 'circle',
  HEXAGON: 'hexagon',
  STAR: 'star',
};

const COLORS = {
  RED: 'bg-red-500',
  BLUE: 'bg-blue-500',
  GREEN: 'bg-green-500',
  PURPLE: 'bg-purple-500',
  PINK: 'bg-pink-500',
  YELLOW: 'bg-yellow-500',
};

const LEVELS = [
  {
    id: 1,
    slots: 3,
    timeLimit: 60,
    pattern: [
      { type: SHAPES.TRIANGLE, rotation: 0, color: COLORS.BLUE },
      { type: SHAPES.SQUARE, rotation: 0, color: COLORS.PURPLE },
      { type: SHAPES.CIRCLE, rotation: 90, color: COLORS.PINK },
    ],
    description: "Create the pattern: Triangle → Square → Rotated Circle (90°)",
    points: 100,
  },
  {
    id: 2,
    slots: 4,
    timeLimit: 45,
    pattern: [
      { type: SHAPES.SQUARE, rotation: 45, color: COLORS.RED },
      { type: SHAPES.TRIANGLE, rotation: 180, color: COLORS.BLUE },
      { type: SHAPES.CIRCLE, rotation: 0, color: COLORS.GREEN },
      { type: SHAPES.STAR, rotation: 90, color: COLORS.YELLOW },
    ],
    description: "Match: Rotated Square (45°) → Flipped Triangle → Circle → Rotated Star",
    points: 200,
  },
  {
    id: 3,
    slots: 5,
    timeLimit: 30,
    pattern: [
      { type: SHAPES.HEXAGON, rotation: 30, color: COLORS.PURPLE },
      { type: SHAPES.STAR, rotation: 45, color: COLORS.YELLOW },
      { type: SHAPES.TRIANGLE, rotation: 270, color: COLORS.BLUE },
      { type: SHAPES.CIRCLE, rotation: 0, color: COLORS.GREEN },
      { type: SHAPES.SQUARE, rotation: 135, color: COLORS.RED },
    ],
    description: "Complex pattern with specific rotations and colors",
    points: 300,
  },
];

const Shape = ({ type, rotation = 0, color, isDraggable = true, onRotate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'shape',
    item: { type, color },
    canDrag: isDraggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getShapeClass = () => {
    const baseClass = color || COLORS.BLUE;
    switch (type) {
      case SHAPES.TRIANGLE:
        return `clip-triangle ${baseClass}`;
      case SHAPES.SQUARE:
        return baseClass;
      case SHAPES.CIRCLE:
        return `rounded-full ${baseClass}`;
      case SHAPES.HEXAGON:
        return `clip-hexagon ${baseClass}`;
      case SHAPES.STAR:
        return `clip-star ${baseClass}`;
      default:
        return baseClass;
    }
  };

  const shapeContent = (
    <motion.div
      className={`w-16 h-16 ${getShapeClass()}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease',
        cursor: isDraggable ? 'move' : 'pointer',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => !isDraggable && onRotate && onRotate()}
    />
  );

  return isDraggable ? (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="shape-container"
    >
      {shapeContent}
    </div>
  ) : (
    shapeContent
  );
};

const DropSlot = ({ index, onDrop, shape, onRotate }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'shape',
    drop: (item) => onDrop(index, item.type, item.color),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`w-16 h-16 flex items-center justify-center rounded-lg transition-all duration-200 ${
        isOver && canDrop
          ? 'border-2 border-green-400 border-dashed bg-green-400/10'
          : !shape
          ? 'border-2 border-gray-600 border-dashed'
          : ''
      }`}
    >
      {shape && (
        <Shape
          type={shape.type}
          color={shape.color}
          rotation={shape.rotation}
          isDraggable={false}
          onRotate={() => onRotate(index)}
        />
      )}
    </div>
  );
};

const Timer = ({ timeLeft, totalTime }) => (
  <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
    <motion.div
      className="bg-green-600 h-2.5 rounded-full"
      initial={{ width: "100%" }}
      animate={{ width: `${(timeLeft / totalTime) * 100}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

const ShapePattern = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'won', 'lost'

  useEffect(() => {
    if (gameState === 'playing') {
      const level = LEVELS[currentLevel];
      setPattern(Array(level.slots).fill(null));
      setTimeLeft(level.timeLimit);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState('lost');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState, currentLevel]);

  const handleDrop = (index, shapeType, color) => {
    if (pattern[index]) return;
    const newPattern = [...pattern];
    newPattern[index] = { type: shapeType, rotation: 0, color };
    setPattern(newPattern);
    validatePattern(newPattern);
  };

  const handleRotate = (index) => {
    if (!pattern[index]) return;
    
    const newPattern = [...pattern];
    newPattern[index] = {
      ...newPattern[index],
      rotation: (newPattern[index].rotation + 90) % 360,
    };
    setPattern(newPattern);
    validatePattern(newPattern);
  };

  const validatePattern = (currentPattern) => {
    const level = LEVELS[currentLevel];
    const isComplete = currentPattern.every((shape) => shape !== null);
    
    if (!isComplete) {
      setIsValid(false);
      return;
    }

    const isCorrect = currentPattern.every((shape, index) => {
      const target = level.pattern[index];
      return (
        shape.type === target.type &&
        shape.rotation === target.rotation &&
        shape.color === target.color
      );
    });

    setIsValid(isCorrect);

    if (isCorrect) {
      const newScore = score + level.points + Math.floor(timeLeft * 2);
      setScore(newScore);
      
      if (currentLevel === LEVELS.length - 1) {
        setGameState('won');
      } else {
        setTimeout(() => {
          setCurrentLevel(currentLevel + 1);
          setPattern(Array(LEVELS[currentLevel + 1].slots).fill(null));
        }, 1000);
      }
    }
  };

  const startGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setGameState('playing');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'start':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Shape Pattern Challenge
            </h2>
            <p className="text-gray-400 mb-6">
              Complete each level by arranging shapes in the correct pattern.
              Watch out for rotations and colors!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start Game
            </button>
          </motion.div>
        );

      case 'playing':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                Level {currentLevel + 1}
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-2">
                {LEVELS[currentLevel].description}
              </p>
              <p className="text-gray-400 text-sm md:text-base">
                Score: {score} | Time: {timeLeft}s
              </p>
              <Timer timeLeft={timeLeft} totalTime={LEVELS[currentLevel].timeLimit} />
            </div>

            <div className="flex flex-col items-center space-y-8">
              <div className="flex justify-center gap-8 flex-wrap">
                {Object.entries(SHAPES).map(([_, type]) => (
                  Object.entries(COLORS).map(([_, color]) => (
                    <Shape key={`${type}-${color}`} type={type} color={color} />
                  ))
                ))}
              </div>

              <div className="flex justify-center gap-8">
                {pattern.map((shape, index) => (
                  <DropSlot
                    key={index}
                    index={index}
                    onDrop={handleDrop}
                    shape={shape}
                    onRotate={handleRotate}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'won':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-green-500">
              Congratulations!
            </h2>
            <p className="text-gray-400 mb-4">
              You completed all levels with a score of {score}!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Play Again
            </button>
          </motion.div>
        );

      case 'lost':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-red-500">
              Time's Up!
            </h2>
            <p className="text-gray-400 mb-4">
              Final Score: {score}
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex justify-center items-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mx-auto px-4"
        >
          <div className="relative px-6 py-8 md:px-8 md:py-12 bg-gray-800/50 shadow-lg rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-700">
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                {renderGameState()}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </DndProvider>
  );
};

export default ShapePattern;
