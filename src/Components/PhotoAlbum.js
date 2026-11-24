
import React, { useEffect, useState, useRef } from "react";

import "./PhotoAlbum.css";
import { albums } from "./albums.js";

import AlbumPreview from "./AlbumPreview";
import { chunkArray, normalizeAlbum } from "./albumUtils";

const COLUMNS = 3;
const WIDTH = 300;
const HEIGHT = 200;

export default function PhotoAlbum({ mainAudioRef }) {
  const [isHover, setIsHover] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [rotations, setRotations] = useState({});

  const albumAudioRef = useRef(null);

  const rows = chunkArray(albums, COLUMNS);

  // Generate random postcard positions.
  useEffect(() => {
    const random = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const positions = {};

    albums.forEach((album, index) => {
      positions[index] = {
        x: random(-130, 130),
        y: random(-100, 100),
        rot: random(-35, 35),
        zIndex: random(1, 20)
      };
    });

    setRotations(positions);
  }, []);

  // Pause main music while an album is open.
  // Resume it when the album closes.
  useEffect(() => {
    const mainAudio = mainAudioRef.current;

    if (!mainAudio) return;

    if (selectedAlbum) {
      mainAudio.pause();
    }
  }, [selectedAlbum, mainAudioRef]);

  // Clean up audio when the component unmounts.
  useEffect(() => {
    return () => {
      albumAudioRef.current?.pause();
    };
  }, []);

  // Postcard positioning.
  const getPostcardStyle = (index) => {
    const position = rotations[index];

    if (!position) return {};

    return {
      width: `${WIDTH}px`,
      height: `${HEIGHT}px`,

      transform:
        isHover || selectedAlbum
          ? "none"
          : `translate(${position.x}px, ${position.y}px) rotate(${position.rot}deg)`,

      zIndex: isHover || selectedAlbum ? 1 : position.zIndex
    };
  };

  // Open an album.
  const openPreview = async (album) => {
    const normalizedAlbum = normalizeAlbum(album);

    if (normalizedAlbum.media.length === 0) {
      console.warn(`Album "${album.title}" has no media.`);
      return;
    }

    setSelectedAlbum(normalizedAlbum);
    setSelectedMedia(normalizedAlbum.media[0]);

    const audio = albumAudioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;

      if (album.music) {
        const musicPath = `${process.env.PUBLIC_URL}/${album.music.replace(/^\/+/, '')}`;
        audio.src = musicPath;
        audio.load();

        try {
          await audio.play();
        } catch (error) {
          console.error("Album music playback failed:", error);
        }
      } else {
        audio.removeAttribute("src");
        audio.load();
      }
    }
  };

  // Select a photo or video.
  const selectMedia = (media) => {
    setSelectedMedia(media);
  };

  // Close album and stop its music.
const closePreview = async () => {
  const audio = albumAudioRef.current;

  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  setSelectedAlbum(null);
  setSelectedMedia(null);

  const mainAudio = mainAudioRef.current;

  if (mainAudio) {
    try {
      await mainAudio.play();
    } catch (error) {
      console.error("Background music playback failed:", error);
    }
  }
};

  return (
    <div
      className={`gallery ${
        isHover || selectedAlbum ? "gallery-display" : ""
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* MAIN GALLERY */}
      <div className="gallery-content">
        {rows.map((row, rowIndex) => (
          <div className="gallery__row" key={rowIndex}>
            {row.map((album, imageIndex) => {
              const index = rowIndex * COLUMNS + imageIndex;

              return (
                <div
                  className="gallery__row__image"
                  key={album.id}
                >
                  <div
                    className="postcard"
                    style={getPostcardStyle(index)}
                    onClick={() => openPreview(album)}
                  >
                    <div className="postcard__front">
                      <img
                        src={`${process.env.PUBLIC_URL}/${album.cover.replace(/^\/+/, '')}`}
                        alt={album.title}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ALBUM PREVIEW */}
      <AlbumPreview
        selectedAlbum={selectedAlbum}
        selectedMedia={selectedMedia}
        onClose={closePreview}
        onSelectMedia={selectMedia}
      />

      {/* ALBUM MUSIC */}
      <audio
        ref={albumAudioRef}
        preload="auto"
        loop
      />

    </div>
  );
}
