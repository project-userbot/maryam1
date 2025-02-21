import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target } from 'lucide-react';

export function FloatingHeart({ onCatch }: { onCatch: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.div
          className="cursor-pointer relative scale-90 sm:scale-100"
          initial={{ scale: 0 }}
          animate={{
            x: ["-3vw", "3vw", "-2vw", "2vw", "-3vw"],
            y: ["-3vh", "6vh", "-2vh", "4vh", "-3vh"],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={onCatch}
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-pink-500/20"></div>
          <div className="relative z-10">
            <Heart
              className="text-pink-500 drop-shadow-heart-glow"
              size={140}
              fill="currentColor"
            />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Target className="text-yellow-300 mb-2 animate-bounce" size={48} />
                <span className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold mt-2 bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent enhanced-text-shadow">
                  Click to Catch My Heart!
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 
