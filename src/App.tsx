import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Terminal from './components/Terminal';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <Terminal />
    </div>
  );
}

export default App;
