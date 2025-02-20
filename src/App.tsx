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

function MagicTitle() {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  
  const calc = (event: React.MouseEvent) => {
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    return [-(y - 0.5) * 20, (x - 0.5) * 20, 1.1];
  };
  
  const trans = (x: number, y: number, s: number) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  return (
    <animated.h1
      className="text-5xl md:text-7xl text-center mb-12 font-['Great_Vibes'] magical-text relative z-10"
      style={{
        transform: x.to((x, y) => trans(x, y, 1.1)),
      }}
      onMouseMove={(e) => set({ x: calc(e)[0], y: calc(e)[1] })}
      onMouseLeave={() => set({ x: 0, y: 0 })}
    >
      To the man who holds my heart
    </animated.h1>
  );
}

function App() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);
  const [play, { stop }] = useSound(
    'https://github.com/ideafy1/assetsmarya/raw/main/die-with-a-smile-lyrics-lady-gaga-ft-bruno-mars-128-ytshorts.savetube.me.mp3',
    { volume: 0.5 }
  );
  const particles = useRef<any>(null);

  const handleFingerprint = () => {
    play();
    setIsLetterOpen(true);
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
            className="min-h-screen flex flex-col items-center justify-center p-4 relative"
          >
            <MagicTitle />
            <motion.p
              className="text-2xl font-['Lato'] text-gray-700 mb-12 magical-text-secondary hover-underline"
              whileHover={{ scale: 1.05 }}
            >
              Open Your Surprise
            </motion.p>
            <motion.button
              onClick={handleFingerprint}
              className="magical-button p-8 rounded-full relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-0 rounded-full magical-border"></div>
              <Fingerprint size={80} className="text-white relative z-10" />
              <div className="absolute inset-0 magical-glow rounded-full"></div>
            </motion.button>
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
              <div className="font-['Dancing_Script'] text-2xl leading-relaxed text-gray-800 dark:text-white text-center whitespace-pre-line">
                <TypewriterText
                  text="Baby, I am so blessed 🍀 you came into my life! I am so lucky and grateful that I found a guy who is beautiful inside and out. You are a gentleman—the way you take care of me, the way you look at me with full love, the way you listen to my yapping—you are my greenest planet!!

You know our bond is like clear crystal water—no lies, no trust issues, only pure love. And you are my home; you make me complete 🎀

I promise that I will be by your side in any situation, and I am there for you always. I hope you like this little surprise."
                  delay={40}
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
                <motion.div
                  className="text-center"
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