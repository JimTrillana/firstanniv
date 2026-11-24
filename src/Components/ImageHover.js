import React, { useRef } from "react";
import "./ImageHover.css";

function ImageHover({ image, imageIndex, description, music }) {
  const audioRef = useRef(null);

  const handleMouseEnter = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      console.log("Unable to play audio:", error);
    }
  };

  const handleMouseLeave = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <div
      className="image-hover-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image} alt={imageIndex} />

      <div className="description-panel">
        <h3>{imageIndex}</h3>
        <p>{description}</p>
      </div>

      <audio
        ref={audioRef}
        src={music}
        preload="auto"
        loop
      />
    </div>
  );
}

export default ImageHover;