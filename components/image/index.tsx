"use client";

import type { ImageProps } from "next/image";

import { motion } from "framer-motion";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
// import ImageZoom from "next/image";
import React from "react";

interface MDXImageProps extends ImageProps {
  alt: string;
  caption?: string;
}

export default function MDXImage({ caption, alt, ...props }: MDXImageProps) {
  const [isImageLoading, setImageLoading] = React.useState(true);
  const [isOverlayOpen, setIsOverlayOpen] = React.useState(false);

  return (
    <>
      <motion.div className="mt-4 mb-16 flex cursor-pointer flex-col justify-end gap-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-large border border-border shadow-sm">
          <ImageZoom
            {...props}
            alt={alt}
            className="object-contain"
            onLoad={() => setImageLoading(false)}
            style={{
              WebkitFilter: isImageLoading ? "blur(8px)" : "none",
              transition: "all 0.5s ease",
            }}
            // rmiz={{

            // }}
          />
        </div>
        {caption && <sub className="pt-2 text-center">{caption}</sub>}
      </motion.div>
    </>
  );
}
