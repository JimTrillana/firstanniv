
export const normalizeAlbum = (album) => {
  const items = album.media || album.photos || [];

  const media = items.map((item, index) => ({
    ...item,
    id: item.id ?? index + 1,
    type: item.type || "image",
    src: item.src || item.image
  }));

  return {
    ...album,
    media
  };
};

export const chunkArray = (array, size) => {
  const result = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
};

export const renderMedia = (media, className = "") => {
  if (media.type === "video") {
    return (
      <video
        className={className}
        src={`${process.env.PUBLIC_URL}/${media.src.replace(/^\/+/, '')}`}
        poster={media.poster}
        controls
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      className={className}
      src={`${process.env.PUBLIC_URL}/${media.src.replace(/^\/+/, '')}`}
      alt={media.title || "Album memory"}
    />
  );
};
