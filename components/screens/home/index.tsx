"use client";

import type { ImageProps } from "@/types/gallery";

import { Footer } from "@/components/footer";
import Gallery from "@/components/gallery";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";

import { GlobeIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoadingImages(false);
      }
    }

    fetchImages();
  }, []);

  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <div className="flex justify-between">
          <div className="flex w-full flex-col">
            <h1 className="text-xl">Rayandra Valera</h1>
            <h2 className="font-normal text-muted">software, ux, product designer</h2>
          </div>
          <a href="https://linkedin.com/in/rayandra" target="_blank" rel="noreferrer">
            <LinkedInLogoIcon className="mr-4 h-4 w-4" />
          </a>
          <a href="https://dribbble.com/rayvaltra" target="_blank" rel="noreferrer">
            <GlobeIcon className="h-4 w-4 rotate-[-10deg]" />
          </a>
        </div>
      </FadeIn.Item>
      <Spacer />
      <FadeIn.Item>
        <p>
          I simplify complex system into user-friendly interface through user research and design iteration. I’ve built designs that helps to generate million
          dollars of revenue.
        </p>
      </FadeIn.Item>
      <FadeIn.Item>
        <Posts category="projects" />
      </FadeIn.Item>
      <Spacer />
      <FadeIn.Item>
        <h2 className="mb-2 w-full border-border border-b py-2 capitalize">Designs</h2>
        {!isLoadingImages && images.length > 0 && <Gallery images={images} />}
      </FadeIn.Item>
      <Spacer />
      <FadeIn.Item>
        <Footer />
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
