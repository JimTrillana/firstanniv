
import React, { useState, useRef, useEffect } from 'react';
import TextLoop from './Components/TextLoop';
import PhotoAlbum from './Components/PhotoAlbum';
import LoveChat from './Components/LoveChat';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLoveChat, setShowLoveChat] = useState(false);

  const mainAudioRef = useRef(null);

  useEffect(() => {
    const audio = mainAudioRef.current;

    if (audio) {
      audio.play().catch((error) => {
        console.log("Autoplay blocked:", error);
      });
    }
  }, []);

  const openMemories = () => {
      mainAudioRef.current?.play().catch((error) => {
    console.log("Audio playback error:", error);
  });
  
    setShowWelcome(false);
    setShowLoveChat(true);
  };

  const closeLoveChat = () => {
    setShowLoveChat(false);
  };

  return (
    <div className="App">

      {/* WELCOME POPUP */}
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-popup">

            <div className="welcome-heart">♥</div>

            <h1>Happy 1st Anniversary, Bebe!</h1>

            <p className="welcome-message">
              I love you so much! ❤️
            </p>

            <p className="welcome-subtitle">
              One year of love, laughter, and beautiful memories.
              Here's to many more years together!
            </p>

            <button
              className="welcome-button"
              onClick={openMemories}
            >
              Open Our Memories ❤️
            </button>

          </div>
        </div>
      )}

      {/* LOVE CHAT POPUP */}
      {showLoveChat && (
        <LoveChat onClose={closeLoveChat} />
      )}

      {/* HEADER AND PHOTO ALBUM */}
      {!showWelcome && !showLoveChat && (
        <>
          <header className="App-header">
            <TextLoop
              text="Happy First Anniversary!"
              shape="wave"
              speed={90}
              direction="forward"
              separator="💗"
              curviness={30}
              tilt={0}
              fontSize={26}
              fontWeight={500}
              letterSpacing={2}
              uppercase
              ribbon
              ribbonColor="#78cde2"
              ribbonWidth={56}
              edgeFade={0}
              cross={false}
              crossAngle={16}
              draggable={false}
              scrollBoost={0}
              outline={false}
              pauseOnHover={false}
              outlineWidth={1.5}
            />
          </header>

          <PhotoAlbum mainAudioRef={mainAudioRef} />
        </>
      )}

<audio
  ref={mainAudioRef}
  src="/audio/DontGo.mp3"
  preload="auto"
  loop
/>
    </div>
  );
}

export default App;
