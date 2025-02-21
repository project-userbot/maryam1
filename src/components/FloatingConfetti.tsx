import React from 'react';
import { motion } from 'framer-motion';

export function FloatingConfetti() {
  const colors = ['#ff69b4', '#9f7aea', '#4299e1', '#f687b3', '#b794f4', '#ffc107', '#20c997'];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            opacity: 1,
            rotate: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: window.innerHeight + 20,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: 'linear'
          }}
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            width: 8,
            height: 8,
            borderRadius: '20%',
            position: 'absolute'
          }}
        />
      ))}
    </div>
  );
} 