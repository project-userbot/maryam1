import React from 'react';
import { motion } from 'framer-motion';

interface ButterflyProps {
  color?: string;
  size?: number;
}

export function Butterfly({ color = "#FF69B4", size = 30 }: ButterflyProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="butterfly"
    >
      <motion.path
        d="M50 35C50 35 65 15 80 20C95 25 95 45 85 55C75 65 50 65 50 65C50 65 25 65 15 55C5 45 5 25 20 20C35 15 50 35 50 35Z"
        fill={color}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M50 65C50 65 65 85 80 80C95 75 95 55 85 45C75 35 50 35 50 35C50 35 25 35 15 45C5 55 5 75 20 80C35 85 50 65 50 65Z"
        fill={color}
        animate={{
          scale: [1, 0.9, 1],
          rotate: [0, -15, 15, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <circle cx="50" cy="50" r="3" fill="#FFF" />
    </motion.svg>
  );
} 