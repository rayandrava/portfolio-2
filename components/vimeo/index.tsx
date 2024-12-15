"use client";

import { motion } from "framer-motion";

interface VimeoProps {
  videoId: string;
  caption?: string;
}

export default function Vimeo({ videoId, caption }: VimeoProps) {
  return (
    <motion.div className="mt-4 mb-16 flex cursor-pointer flex-col justify-end gap-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-large border border-border bg-[#f9f9f9] shadow-sm">
        <iframe
          title={caption || "Vimeo video player"}
          src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&title=0&byline=0&portrait=0&badge=0`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <div className="-translate-x-1/2 absolute bottom-3 left-1/2 rounded-full border border-gray-200 bg-gray-2/40 px-2 py-1.5 backdrop-blur-sm">
          <p className="text-center text-gray-8 text-xs">VIDEO LOOP</p>
        </div>
      </div>
      {caption && <sub className="pt-2 text-center">{caption}</sub>}
    </motion.div>
  );
}
