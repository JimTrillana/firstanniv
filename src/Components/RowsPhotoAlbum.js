import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

const photos = [
  {
    src: "https://tse1.mm.bing.net/th/id/OIP.x3-SqHLOceYJ_s6IOFXlkAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    width: 800,
    height: 600,
  },
  {
    src: "https://tse1.mm.bing.net/th/id/OIP.x3-SqHLOceYJ_s6IOFXlkAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    width: 1600,
    height: 900,

  },
];

export default function Gallery() {
  return (
    <MasonryPhotoAlbum
      photos={photos}
      sizes={{
        size: "1168px",
        sizes: [
          {
            viewport: "(max-width: 1200px)",
            size: "calc(100vw - 32px)",
          },
        ],
      }}
    />
  );
}