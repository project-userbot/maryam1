import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Heart, Stars, Eye } from 'lucide-react';
import useSound from 'use-sound';
import { useSpring, animated } from '@react-spring/web';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { TypewriterText } from './components/TypewriterText';
import { FloatingHeart } from './components/FloatingHeart';
import { Butterfly } from './components/Butterfly';
import { FloatingConfetti } from './components/FloatingConfetti';

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: {
          number: { value: 15, density: { enable: true, value_area: 800 } },
          color: { value: "#ff69b4" },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 10,
            random: true,
            anim: {
              enable: true,
              speed: 4,
              size_min: 5,
              sync: false
            }
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            bubble: {
              distance: 200,
              size: 17,
              duration: 2,
              opacity: 0.8,
            },
            push: { particles_nb: 4 },
          }
        },
        retina_detect: true,
        background: {
          color: "transparent",
        }
      }}
    />
  );
}

function FloatingStars() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          <Stars className="text-yellow-300" size={Math.random() * 10 + 5} />
        </motion.div>
      ))}
    </div>
  );
}

function FloatingButterflies() {
  const colors = [
    "#FF69B4", // pink
    "#9F7AEA", // purple
    "#4299E1", // blue
    "#F687B3", // light pink
    "#B794F4", // light purple
  ];

  const generatePath = () => {
    const points = [];
    for (let i = 0; i < 4; i++) {
      points.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });
    }
    return points;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(8)].map((_, i) => {
        const path = generatePath();
        const size = Math.random() * 20 + 25; // Random size between 25-45
        
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: -100,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: [
                path[0].x,
                path[1].x,
                path[2].x,
                path[3].x,
                window.innerWidth + 100
              ],
              y: [
                path[0].y,
                path[1].y,
                path[2].y,
                path[3].y,
                path[0].y
              ],
              rotate: [0, 10, -10, 15, -15, 0],
              scale: [1, 1.2, 0.8, 1.1, 0.9, 1]
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          >
            <motion.div
              animate={{
                y: [-5, 5, -5],
                rotate: [-10, 10, -10]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Butterfly 
                color={colors[Math.floor(Math.random() * colors.length)]}
                size={size}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function MagicTitle() {
  return (
    <div className="magical-title-container px-4 sm:px-6">
      <h1 className="text-4xl sm:text-6xl md:text-7xl text-center mb-8 sm:mb-12 font-['Playfair_Display'] magical-text enhanced-text-shadow">
        To the man who holds my heart
      </h1>
    </div>
  );
}

function App() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);
  const [play, { stop }] = useSound(
    'https://raw.githubusercontent.com/ideafy1/assetsmarya/main/die-with-a-smile-lyrics-lady-gaga-ft-bruno-mars-128-ytshorts.savetube.me.mp3',
    { 
      volume: 0.5,
      onload: () => console.log('Audio loaded'),
      onplay: () => console.log('Playing audio'),
      onerror: (error) => console.error('Audio error:', error),
      html5: true
    }
  );
  const particles = useRef<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleFingerprint = () => {
    setIsScanning(true);
    setTimeout(() => {
      play();
      setIsLetterOpen(true);
    }, 2000);
  };

  const handleLetterComplete = useCallback(() => {
    console.log('Letter complete - showing floating heart');
    setTimeout(() => {
      setShowFloatingHeart(true);
      console.log('Floating heart state:', true);
      particles.current?.setOptions(options => ({
        ...options,
        particles: {
          ...options.particles,
          number: { value: 50, density: { enable: true, value_area: 800 } },
          move: { speed: 4 }
        }
      }));
    }, 500);
  }, []);

  const handleCatchHeart = useCallback(() => {
    console.log('Heart caught - showing final message');
    setShowFloatingHeart(false);
    setShowFinalMessage(true);
    stop();
    particles.current?.setOptions(options => ({
      ...options,
      particles: {
        ...options.particles,
        number: { value: 100, density: { enable: false } },
        move: { speed: 6 }
      }
    }));
  }, []);

  return (
    <div className="min-h-screen magical-bg overflow-hidden">
      <ParticlesBackground />
      <FloatingStars />
      <AnimatePresence>
        {!isLetterOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10"
          >
            <FloatingButterflies />
            <MagicTitle />
            <motion.p
              className="text-xl sm:text-2xl font-['Dancing_Script'] text-gray-700 mb-8 sm:mb-12 magical-text-secondary enhanced-text-shadow text-center px-4"
              whileHover={{ scale: 1.05 }}
            >
              ✨ Touch to Open Your Magical Surprise ✨
            </motion.p>
            <div className="magical-button-container">
              <div className="magical-button-glow" />
              <motion.button
                onClick={handleFingerprint}
                className={`magical-button p-6 sm:p-8 rounded-full relative group scanning-effect ${
                  isScanning ? 'fingerprint-active' : ''
                }`}
                whileTap={{ scale: 0.95 }}
                disabled={isScanning}
              >
                <div className="magical-border" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full"
                  animate={isScanning ? {
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="relative z-10 flex flex-col items-center"
                >
                  <Fingerprint 
                    size={80} 
                    className={`text-white drop-shadow-lg transition-all duration-300 ${
                      isScanning ? 'opacity-80 filter hue-rotate-90' : ''
                    }`}
                  />
                  <motion.span
                    className="mt-2 text-white text-sm font-bold tracking-wider"
                    animate={isScanning ? {
                      opacity: [0, 1, 0]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {isScanning ? 'Scanning...' : 'Touch to Open'}
                  </motion.span>
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {isLetterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-8 relative"
          >
            <motion.div
              className="magical-letter max-w-2xl w-full rounded-lg shadow-xl p-8 relative bg-white/90 dark:bg-gray-800/90"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.2,
                type: "spring",
                bounce: 0.1
              }}
            >
              <div className="font-['Dancing_Script'] text-xl sm:text-2xl leading-relaxed text-gray-800 dark:text-white text-center whitespace-pre-line px-4 sm:px-6 typewriter-text">
                <TypewriterText
                  text="Baby, I am so blessed 🍀 you came into my life! I am so lucky and grateful that I found a guy who is beautiful inside and out. You are a gentleman—the way you take care of me, the way you look at me with full love, the way you listen to my yapping—you are my greenest planet!!

You know our bond is like clear crystal water—no lies, no trust issues, only pure love. And you are my home; you make me complete 🎀

I promise that I will be by your side in any situation, and I am there for you always. I hope you like this little surprise."
                  delay={50}
                  onComplete={handleLetterComplete}
                />
              </div>
            </motion.div>

            {showFinalMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center magical-overlay"
              >
                <FloatingConfetti />
                <motion.div
                  className="relative z-20 text-center"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                >
                  <Heart className="mx-auto text-red-500 mb-4" size={100} fill="currentColor" />
                  <motion.p
                    className="text-6xl font-['Great_Vibes'] text-white magical-final-message"
                    animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    I love you forever 🧿<Eye className="inline-block" size={48} />
                  </motion.p>
                </motion.div>
              </motion.div>
            )}

            {showFloatingHeart && <FloatingHeart onCatch={handleCatchHeart} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
