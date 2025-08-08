import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const vocabularyList = [
  { word: "meticulous", definition: "showing great attention to detail; very careful and precise" },
  { word: "alleviate", definition: "make (suffering, deficiency, or a problem) less severe" },
  { word: "contemplate", definition: "look thoughtfully for a long time at" },
  { word: "resilient", definition: "able to withstand or recover quickly from difficult conditions" },
  { word: "persevere", definition: "continue in a course of action even in the face of difficulty" },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % vocabularyList.length);
      setInput("");
      setIsCorrect(null);
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(interval);
  }, []);

  const handleCheck = () => {
    if (input.toLowerCase().trim() === vocabularyList[index].word.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="container">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="title">
        Daily English Word Trainer
      </motion.h1>
      <div className="card">
        <p><strong>Definition:</strong></p>
        <p className="definition">{vocabularyList[index].definition}</p>
        <input
          type="text"
          placeholder="Enter the word..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleCheck}>Check</button>
        {isCorrect === true && <p className="correct">Correct!</p>}
        {isCorrect === false && <p className="incorrect">Incorrect. The word was "{vocabularyList[index].word}"</p>}
      </div>
    </div>
  );
}