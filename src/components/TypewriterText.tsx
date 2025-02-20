import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export function TypewriterText({ text, delay = 50, onComplete }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
    } else if (onComplete) {
      onComplete();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentIndex, delay, text, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="relative inline-flex items-center">
      {displayText}
      {showCursor && currentIndex < text.length && (
        <Heart 
          className="inline-block ml-1 text-pink-500 animate-pulse" 
          size={20}
          fill="currentColor"
        />
      )}
    </span>
  );
} 