
import React from "react";
import { renderMedia } from "./albumUtils";

export default function AlbumPreview({
  selectedAlbum,
  selectedMedia,
  onClose,
  onSelectMedia
}) {
  if (!selectedAlbum || !selectedMedia) return null;

  return (
    <div className="preview-overlay" onClick={onClose}>
      <div className="heart-animation">♥</div>

      {/* ALBUM MUSIC INFORMATION */}
      <div className="music-box">
        {selectedAlbum.musicCover && (
          <img
            src={selectedAlbum.musicCover}
            alt={`${selectedAlbum.songTitle || "Album"} cover`}
            className="music-cover"
          />
        )}

        <div className="music-info">
          <h3>{selectedAlbum.songTitle || "Our Song"}</h3>
          <p>{selectedAlbum.artist || ""}</p>
          <span>♫ Now Playing</span>
        </div>
      </div>

      <div
        className="preview-container"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close-preview" onClick={onClose}>
          &times;
        </button>

        {/* SELECTED PHOTO OR VIDEO */}
        <div className="preview-main">
          <div className="preview-image">
            {renderMedia(selectedMedia)}
          </div>

          <div className="photo-note">
            <h2>{selectedMedia.title}</h2>
            <p>{selectedMedia.description}</p>
          </div>
        </div>

        {/* MEDIA THUMBNAILS */}
        <div className="preview-gallery">
          <h3>{selectedAlbum.title}</h3>

          <div className="preview-thumbnails">
            {selectedAlbum.media.map((media) => (
              <div
                key={media.id}
                className={`preview-thumbnail ${
                  selectedMedia.id === media.id ? "active" : ""
                }`}
                onClick={() => onSelectMedia(media)}
              >
                {media.type === "video" ? (
                  <div className="video-thumbnail">
                    <img
                      src={
                        media.poster ||
                        "https://media.istockphoto.com/id/1366223297/vector/doodle-icon-shape-heart-love-and-online-video-showing-sign-love-valentine-video-message-and.jpg?s=612x612&w=0&k=20&c=ZRMgNMQ5fMYgoxeTwq1a8G6zLuYU1tqdsAgQ3T1oDd8="
                      }
                      alt={media.title || "Video thumbnail"}
                    />

                    <div className="video-play-icon">▶</div>
                  </div>
                ) : (
                  <img
                    src={media.src}
                    alt={media.title || "Photo thumbnail"}
                  />
                )}

                <span>{media.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
