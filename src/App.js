import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import musicFile from "./music/miley.mp3"; 
import Envelope from "./Envelope";

import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";

export default function App() {
  const [answer, setAnswer] = useState(null);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [photoList, setPhotoList] = useState([img1, img2, img3, img4]);
  
  // Responsive State
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    if (hasOpenedEnvelope && !answer) {
      const interval = setInterval(() => {
        setPhotoList((prevPhotos) => {
          const newPhotos = [...prevPhotos];
          const shiftedPhoto = newPhotos.shift();
          newPhotos.push(shiftedPhoto);
          return newPhotos;
        });
      }, 3000);
      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
      };
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [hasOpenedEnvelope, answer]);

  const handleStartMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log("Playback blocked", err));
      setIsPlaying(true);
    }
  };

  const handleOpenEnvelope = () => {
    setHasOpenedEnvelope(true);
    setTimeout(() => setShowEnvelope(false), 2000);
  };

  return (
    <div style={styles.container}>
      <audio ref={audioRef} src={musicFile} loop />

      {/* Floating Sparkles & Hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", opacity: 0, x: Math.random() * 100 + "vw" }}
          animate={{ y: "-10vh", opacity: [0, 1, 0] }}
          transition={{ duration: 7 + Math.random() * 5, repeat: Infinity, delay: i * 1.2 }}
          style={{ 
            ...styles.floatingParticle, 
            fontSize: i % 2 === 0 ? "22px" : "14px",
            color: i % 3 === 0 ? "#ff85a2" : "#fbb1bd"
          }}
        >
          {i % 2 === 0 ? "💖" : "✨"}
        </motion.div>
      ))}

      {hasOpenedEnvelope && (
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
          }} 
          style={styles.musicToggle}
        >
          {isPlaying ? "🎵" : "🔇"}
        </motion.button>
      )}

      <AnimatePresence>
        {showEnvelope && !hasOpenedEnvelope && (
          <motion.div key="envelope-screen" exit={{ opacity: 0, scale: 1.1 }} style={styles.fullScreenOverlay}>
            <Envelope onOpen={handleOpenEnvelope} onStartMusic={handleStartMusic} />
          </motion.div>
        )}

        {hasOpenedEnvelope && (
          <motion.div 
            key="main-content" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            style={{
                ...styles.contentLayout,
                flexDirection: isMobile ? "column" : "row",
                padding: isMobile ? "60px 20px" : "20px",
            }}
          >
            {/* --- PHOTO SECTION --- */}
            <div style={{
                ...styles.photoStack,
                width: isMobile ? "240px" : "280px",
                height: isMobile ? "300px" : "360px",
            }}>
              <AnimatePresence mode="popLayout">
                {photoList.map((url, index) => (
                  <motion.div
                    key={url}
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: index === 0 ? 0 : (index % 2 === 0 ? 8 : -8),
                      zIndex: photoList.length - index,
                      y: index * -5 
                    }}
                    exit={{ opacity: 0, x: 250, rotate: 45, transition: { duration: 0.8 } }}
                    style={styles.polaroid}
                  >
                    <img src={url} alt="Joy & Vicky" style={styles.photo} />
                    <div style={styles.captionText}>Moments ✨</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* --- LOVER GIRL CARD SECTION --- */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ 
                opacity: 1, 
                scale: 1,
                boxShadow: ["0 0 20px #fbb1bd", "0 0 40px #ff85a2", "0 0 20px #fbb1bd"]
              }} 
              transition={{ boxShadow: { repeat: Infinity, duration: 3 } }}
              style={{
                  ...styles.card,
                  width: isMobile ? "100%" : "420px",
                  padding: isMobile ? "30px 20px" : "40px",
              }}
            >
              {!answer ? (
                <>
                  <h1 style={styles.title}>Hii Joy, it's Vicky here... 💜</h1>
                  <p style={styles.text}>
                    I’ve been thinking about you a lot. I really like you, and I’m hoping you feel the same way.
                    <span style={styles.highlight}>Joy, will you be my girlfriend? 💍</span>
                  </p>
                  <div style={styles.buttonContainer}>
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "#ff4d6d" }} 
                      whileTap={{ scale: 0.95 }} 
                      style={styles.yesButton} 
                      onClick={() => setAnswer("yes")}
                    >
                      Yes, a thousand times! 💕
                    </motion.button>
                    <button style={styles.noButton} onClick={() => setAnswer("no")}>Let me think... 🤍</button>
                  </div>
                </>
              ) : (
                <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                  <h2 style={styles.title}>
                    {answer === "yes" ? "You just made me the happiest! 💖" : "I respect that 🤍"}
                  </h2>
                  <p style={styles.text}>
                    {answer === "yes" ? "I can't wait for everything we'll do together. ✨" : "You're still amazing to me."}
                  </p>
                  {answer === "yes" && <div style={{fontSize: "40px"}}>🧸🌹</div>}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    background: "radial-gradient(circle, #fff0f3 0%, #fbb1bd 100%)",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflowX: "hidden",
    boxSizing: "border-box",
  },
  floatingParticle: {
    position: "absolute",
    zIndex: 0,
    pointerEvents: "none",
  },
  fullScreenOverlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 240, 243, 0.95)",
    zIndex: 1000,
  },
  contentLayout: {
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "1100px",
    zIndex: 1,
  },
  photoStack: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  polaroid: {
    position: "absolute",
    width: "100%",
    padding: "12px 12px 35px 12px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(255, 133, 162, 0.3)",
    borderRadius: "2px",
    border: "1px solid #fecdd3",
  },
  photo: {
    width: "100%",
    height: "210px",
    objectFit: "cover",
    borderRadius: "1px",
  },
  captionText: {
    fontFamily: "'Dancing Script', cursive",
    textAlign: "center",
    marginTop: "15px",
    color: "#ff85a2",
    fontSize: "22px",
    fontWeight: "bold"
  },
  card: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(15px)",
    borderRadius: "40px 10px 40px 10px",
    textAlign: "center",
    minWidth: "280px",
    border: "2px solid #ff85a2",
    boxSizing: "border-box",
  },
  musicToggle: {
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "2px solid #ff85a2",
    background: "#fff",
    cursor: "pointer",
    zIndex: 100,
    fontSize: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontFamily: "'Dancing Script', cursive",
    color: "#c9184a",
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "20px",
  },
  text: {
    color: "#590d22",
    fontSize: "17px",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  highlight: {
    display: "block",
    marginTop: "15px",
    fontWeight: "800",
    fontSize: "1.1em",
    color: "#ff4d6d",
    textShadow: "0 0 10px rgba(255, 77, 109, 0.2)"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  yesButton: {
    width: "100%",
    padding: "16px",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "bold",
    backgroundColor: "#ff758f",
    color: "#fff",
    boxShadow: "0 10px 20px rgba(255, 117, 143, 0.4)",
  },
  noButton: {
    background: "none",
    border: "none",
    color: "#a4133c",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "underline",
    opacity: 0.6
  }
};