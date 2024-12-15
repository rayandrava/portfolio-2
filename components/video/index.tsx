"use client";

import type { DetailedHTMLProps, VideoHTMLAttributes } from "react";

import { motion } from "framer-motion";

interface MDXVideoProps extends DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
  caption?: string;
}

export default function MDXVideo({ caption, ...props }: MDXVideoProps) {
  return (
    <>
      <motion.div className="mt-4 mb-16 flex cursor-pointer flex-col justify-end gap-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-large border border-border shadow-sm">
          <video className="h-full w-full object-cover" autoPlay controls loop muted playsInline {...props} />
        </div>
        {caption && <sub className="pt-2 text-center">{caption}</sub>}
      </motion.div>
    </>
  );
}
