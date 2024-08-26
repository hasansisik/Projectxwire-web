import React, { useState } from "react";
import { X, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  photoIndex: number;
  closeLightbox: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  photoIndex,
  closeLightbox,
}) => {
  const [currentIndex, setCurrentIndex] = useState(photoIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const resetZoom = () => {
    setZoomLevel(1);
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  };

  const showPrev = () => {
    resetZoom();
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  const showNext = () => {
    resetZoom();
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handleImageClick = () => {
    if (isZoomed) {
      resetZoom();
    } else {
      setZoomLevel(2); // 2x zoom
      setIsZoomed(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed) {
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isZoomed) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;

      const maxX = ((zoomLevel - 1) * window.innerWidth) / 2;
      const maxY = ((zoomLevel - 1) * window.innerHeight) / 2;

      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY)),
      });
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="lightbox">
      <div className="top-right-icons">
        <X color="white" size={30} onClick={closeLightbox} />
      </div>
      <div className="lightbox-content-wrapper">
        <ChevronLeft
          color="white"
          size={45}
          style={{
            position: "absolute",
            left: 20, 
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={showPrev}
        />
        <img
          className="lightbox-content"
          src={images[currentIndex]}
          alt=""
          onClick={handleImageClick}
          onMouseDown={handleMouseDown}
          style={{
            cursor: isZoomed ? "move" : "zoom-in",
            transform: `translate(-50%, -50%) scale(${zoomLevel})`,
            position: "absolute",
            top: "50%",
            left: "50%",
            transformOrigin: "center",
            maxWidth: "90%",
            maxHeight: "80%",
            outline: "none",
            border: "none",
            userSelect: "none",
          }}
        />
        <ChevronRight
          color="white"
          size={45}
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={showNext}
        />
      </div>
      <style jsx>{`
        .lightbox {
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none; /* Ekran dışı tıklamada oluşan mavi kenarlığı engeller */
        }
        .top-right-icons {
          position: absolute;
          top: 15px;
          right: 35px;
          display: flex;
          gap: 15px;
          z-index: 10000; /* Z-index değerini artırın */
        }
        .lightbox-content-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Lightbox;
