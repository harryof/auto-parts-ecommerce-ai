import React, { useState } from "react";
import { ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  image?: string;
  images?: string[];
  name: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ image, images, name }) => {
  const allImages = images && images.length > 0 ? images : image ? [image] : [];
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex-shrink-0 w-full lg:w-96 xl:w-[420px]">
      {/* Main image */}
      <div
        className="relative overflow-hidden rounded-2xl bg-dark-800 border border-white/5 mb-3 cursor-zoom-in group"
        style={{ aspectRatio: "4/3" }}
        onClick={() => setZoomed(!zoomed)}
      >
        {allImages.length > 0 ? (
          <img
            src={allImages[active]}
            alt={name}
            className={`w-full h-full object-contain transition-transform duration-500 ${zoomed ? "scale-150" : "scale-100 group-hover:scale-105"}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-dark-500">
            <span className="text-6xl">📦</span>
            <span className="text-sm text-center px-4">{name}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="glass rounded-xl p-2 text-dark-300">
            <ZoomIn size={16} />
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setZoomed(false); }}
              className={`flex-shrink-0 w-16 h-16 rounded-xl border-2 overflow-hidden transition-all
                ${i === active
                  ? "border-primary-500 shadow-lg shadow-primary-500/20"
                  : "border-white/5 hover:border-white/20"
                }`}
            >
              <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover object-center" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
