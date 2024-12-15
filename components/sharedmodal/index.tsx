import { ArrowLeftIcon, ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import { cn } from "../../lib/utils";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

interface SharedModalProps {
  index: number;
  images: any[];
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  direction?: number;
}

export default function SharedModal({ index, images, changePhotoId, closeModal, direction = 0 }: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  const currentImage = images[index];

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="relative z-50 flex flex-col gap-4 justify-self-center">
        <div className="relative z-50 flex aspect-[3/2] w-full max-w-5xl justify-self-center">
          <div className="w-full overflow-hidden rounded-lg">
            <div className="relative flex aspect-[3/2] w-full items-center justify-self-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div key={index} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="absolute">
                  <Image
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1920/${currentImage.public_id}.${currentImage.format}`}
                    width={1920}
                    height={1280}
                    priority
                    alt="Gallery image"
                    onLoad={() => setLoaded(true)}
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {loaded && (
            <div className="absolute inset-0 mx-auto flex max-w-5xl items-center justify-center">
              <div className="relative aspect-[3/2] max-h-full w-full">
                {index > 0 && (
                  <button
                    type="button"
                    className="-translate-y-1/2 absolute top-[50%] left-3 z-50 rounded-[6px] bg-gray-2 p-1 shadow-sm backdrop-blur-sm transition-opacity duration-300 hover:opacity-60"
                    onClick={() => changePhotoId(index - 1)}
                  >
                    <ArrowLeftIcon className="h-6 w-6" />
                  </button>
                )}
                {index + 1 < images.length && (
                  <button
                    type="button"
                    className="-translate-y-1/2 absolute top-[50%] right-3 z-50 rounded-[6px] bg-gray-2 p-1 shadow-sm transition-opacity duration-300 backdrop-blur-smhover:opacity-60"
                    onClick={() => changePhotoId(index + 1)}
                  >
                    <ArrowRightIcon className="h-6 w-6" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-3 right-3 z-50 rounded-[6px] bg-gray-2 p-1 shadow-sm backdrop-blur-sm transition-opacity duration-300 hover:opacity-60"
                >
                  <Cross2Icon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail gallery */}
        <div className="relative w-full max-w-5xl overflow-hidden rounded-lg bg-black/80 backdrop-blur-lg">
          <div className="scrollbar-hide flex gap-1 overflow-x-auto px-2 py-2">
            {images.map((image, i) => (
              <button
                key={image.id}
                type="button"
                onClick={() => changePhotoId(i)}
                className={cn("relative h-20 flex-none overflow-hidden rounded-md", i === index ? "ring-2 ring-white" : "opacity-50 hover:opacity-100")}
              >
                <Image
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_180/${image.public_id}.${image.format}`}
                  width={180}
                  height={120}
                  alt="Thumbnail"
                  className="h-full w-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
