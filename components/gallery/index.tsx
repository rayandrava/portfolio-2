import Image from "next/image";
import { useEffect, useState } from "react";

import type { ImageProps } from "../../types/gallery";
import Modal from "../modal";

export default function Gallery({ images }: { images: ImageProps[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };
  const getVisibleImageCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [visibleImages, setVisibleImages] = useState(getVisibleImageCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleImages(getVisibleImageCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {images.slice(0, visibleImages).map((image, index) => (
          <div key={image.id} className="cursor-zoom-in" onClick={() => openModal(index)}>
            <Image
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${image.public_id}.${image.format}`}
              alt="Gallery Image"
              width={720}
              height={480}
              className="borde overflow-hidden rounded-lg shadow-sm transition-opacity lg:hover:opacity-90"
            />
          </div>
        ))}
      </div>

      {modalOpen && <Modal images={images} index={selectedIndex} onClose={() => setModalOpen(false)} />}
    </>
  );
}
