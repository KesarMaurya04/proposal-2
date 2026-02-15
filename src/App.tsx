import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const photos = ["photo2.jpeg", "photo3.jpeg", "photo1.jpeg"];

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to bottom right, #3b0764, black, #312e81)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    color: "white",
    fontFamily: "sans-serif",
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    padding: "35px",
    borderRadius: "25px",
    textAlign: "center",
    width: "90%",
    maxWidth: "420px",
    boxShadow: "0 0 40px rgba(186,85,211,0.6)",
    position: "relative",
  },

  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },

  imageWrapper: {
    height: "230px",
    marginBottom: "20px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  text: {
    fontSize: "18px",
    marginBottom: "25px",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },

  yesBtn: {
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ffb6ff",
    color: "black",
  },

  noBtn: {
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "white",
    color: "black",
    transition: "transform 0.2s ease",
  },
};

export default function MahashivratriProposal() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({});
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* 🎵 Slideshow after YES */
  useEffect(() => {
    if (!accepted) return;

    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [accepted]);

  /* 💜 YES CLICK */
  const handleAccept = () => {
    setAccepted(true);

    // 🎉 Confetti burst
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });

    // 🎵 Play selected part of song
    const audio = audioRef.current;
    if (!audio) return;

    const start = 140; // 2:20
    const end = 170;   // 2:50

    audio.currentTime = start;
    audio.volume = 0.5;

    audio.play().then(() => {
      audio.ontimeupdate = () => {
        if (audio.currentTime >= end) {
          audio.currentTime = start;
        }
      };
    });
  };

  /* ❌ Dodge NO */
  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 80) - 40;

    setNoPosition({
      transform: `translate(${randomX}px, ${randomY}px)`,
    });
  };

  return (
    <div style={styles.container}>
      <audio ref={audioRef} src="/shiv.mp3" preload="auto" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={styles.card}
      >
        {!accepted ? (
          <>
            <h1 style={styles.heading}>
              🕉️ Happy Mahashivratri 🕉️
            </h1>

            <p style={styles.text}>
              Will you be my <b>Shiva, Laddoo</b>
              <br />
              if I be your <b>Shakti</b>? 💜
            </p>

            <div style={styles.buttonContainer}>
              {/* 💓 Heartbeat YES */}
              <motion.button
                style={styles.yesBtn}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                onClick={handleAccept}
              >
                Yes 💍
              </motion.button>

              <button
                style={{ ...styles.noBtn, ...noPosition }}
                onMouseEnter={moveNoButton}
                onMouseMove={moveNoButton}
              >
                No 🙈
              </button>
            </div>
          </>
        ) : (
          <>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ marginBottom: "15px" }}
            >
              💜 He Said Yes 💜
            </motion.h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhoto}
                style={styles.imageWrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.img
                  src={photos[currentPhoto]}
                  alt="Us"
                  style={styles.image}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              </motion.div>
            </AnimatePresence>

            <p>
              From this Mahashivratri onwards,
              <br />
              We are Shiva & Shakti forever 🕉️✨
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
