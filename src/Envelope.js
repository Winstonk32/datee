import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Envelope = ({ onOpen, onStartMusic }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (!isOpening) {
      setIsOpening(true);
      if (onStartMusic) onStartMusic();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.8 } }}
      style={envelopeStyles.container}
      onClick={handleOpenClick}
    >
      {/* 1. The Inside Paper (Slides up) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isOpening ? "-50%" : "0%" }}
        transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
        style={envelopeStyles.letter}
      >
        <div style={envelopeStyles.letterLine}></div>
        <div style={envelopeStyles.letterLine}></div>
        <div style={envelopeStyles.letterLine}></div>
      </motion.div>

      {/* 2. Envelope Body (Back) */}
      <div style={envelopeStyles.envelopeBack}></div>

      {/* 3. Envelope Bottom/Sides */}
      <div style={envelopeStyles.envelopeSides}></div>

      {/* 4. Envelope Top Flap */}
      <motion.div
        initial={{ rotateX: 0 }}
        animate={{ rotateX: isOpening ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          ...envelopeStyles.envelopeTop,
          zIndex: isOpening ? 0 : 10,
        }}
        onAnimationComplete={() => {
          if (isOpening) {
            setTimeout(onOpen, 1500);
          }
        }}
      >
        <div style={envelopeStyles.heartSeal}>💜</div>
      </motion.div>

      {/* 5. Front Label (Responsive Text) */}
      {!isOpening && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={envelopeStyles.label}
        >
          <h1 style={envelopeStyles.toText}>For Joy 💜</h1>
          <motion.p 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={envelopeStyles.clickText}
          >
            Click to open
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

const envelopeStyles = {
  container: {
    width: 'min(90vw, 320px)', // Takes 90% of screen width, maxes at 320px
    height: 'min(60vw, 210px)', // Keeps aspect ratio on mobile
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    perspective: '1000px',
    boxShadow: '0 15px 35px rgba(107, 33, 168, 0.2)', // Purple tinted shadow
    margin: '0 auto',
  },
  envelopeBack: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#f3e8ff',
    borderRadius: '8px',
    zIndex: 1,
  },
  envelopeSides: {
    position: 'absolute',
    inset: 0,
    zIndex: 3,
    backgroundColor: '#e9d5ff',
    clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%)',
    borderRadius: '8px',
  },
  envelopeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#d8b4fe',
    clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%)',
    transformOrigin: 'top',
    display: 'flex',
    justifyContent: 'center',
  },
  heartSeal: {
    position: 'absolute',
    top: '25%',
    fontSize: 'clamp(24px, 8vw, 32px)', // Scales font based on screen size
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  },
  letter: {
    position: 'absolute',
    inset: '10px 5%',
    height: '90%',
    backgroundColor: '#fff',
    zIndex: 2,
    borderRadius: '4px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
  },
  letterLine: {
    width: '100%',
    height: '3px',
    backgroundColor: '#f3e8ff',
    borderRadius: '2px',
  },
  label: {
    position: 'absolute',
    zIndex: 20,
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  toText: {
    fontFamily: "'Dancing Script', cursive",
    color: '#6b21a8',
    fontSize: 'clamp(28px, 10vw, 38px)', // Dynamic scaling text
    margin: 0,
    textAlign: 'center',
  },
  clickText: {
    fontFamily: "'Inter', sans-serif",
    color: '#a855f7',
    fontSize: 'clamp(10px, 3vw, 12px)',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    fontWeight: 'bold',
    marginTop: '5px',
  }
};

export default Envelope;