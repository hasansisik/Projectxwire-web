"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getFiles } from "@/redux/actions/taskActions";
import Masonry from "react-masonry-css";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";

interface GalleryProps {
  images?: string[];
}

function Gallery({ images = [] }: GalleryProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const breakpointColumnsObj = {
    default: 5, 
    1100: 4, 
    700: 3,
    500: 2, 
    400: 1, 
  };

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  if (!images || images.length === 0) {
    return <p>Projeye ait görsel yok...</p>;
  }

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Resim ${index + 1}`}
            onClick={() => openLightbox(index)}
            className="cursor-pointer"
            style={{
              outline: "none",
              border: "none",
              userSelect: "none",
            }}
          />
        ))}
      </Masonry>

      {isOpen && (
        <Lightbox
          images={images}
          photoIndex={photoIndex}
          closeLightbox={closeLightbox}
        />
      )}
    </div>
  );
}

export default function File() {
  const dispatch = useDispatch<AppDispatch>();
  const files = useSelector((state: RootState) => state.tasks.files) || [];

  useEffect(() => {
    const url = new URL(window.location.href);
    const projectId = url.pathname.split("/").pop();
    if (projectId) {
      dispatch(getFiles(projectId));
    }
  }, [dispatch]);

  return (
    <div>
      <div className="pb-5">
        <h4>Görseller</h4>
        <p className="text-muted-foreground font-normal text-sm">
          Görsellerinizi buradan inceleyebilir, ekleyebilir ve arama
          yapabilirsiniz.
        </p>
      </div>
      <Gallery images={files} />
    </div>
  );
}
