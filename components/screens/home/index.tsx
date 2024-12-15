"use client";

import type { ImageProps } from "@/types/gallery";

import { Footer } from "@/components/footer";
import Gallery from "@/components/gallery";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";

import { ArrowUpRightIcon, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyText, setCopyText] = useState("rayandra.valera@gmail.com");

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("rayandra.valera@gmail.com");
    setCopied(true);
    setCopyText("Email copied to clipboard");
    setTimeout(() => {
      setCopied(false);
      setCopyText("rayandra.valera@gmail.com");
    }, 2000);
  };

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
          <div className="flex flex-row gap-4">
            <a href="https://www.linkedin.com/in/rayandra" target="_blank" rel="noreferrer">
              <div className="flex flex-row items-center justify-center gap-1 text-muted2 text-sm hover:text-foreground hover:underline">
                LinkedIn
                <ArrowUpRightIcon className="h-4 w-4" />
              </div>
            </a>
            <a href="https://dribbble.com/rayvaltra" target="_blank" rel="noreferrer">
              <div className="flex flex-row items-center justify-center gap-1 text-muted2 text-sm hover:text-foreground hover:underline">
                Dribbble
                <ArrowUpRightIcon className="h-4 w-4" />
              </div>
            </a>
          </div>
        </div>
      </FadeIn.Item>
      <Spacer />
      <FadeIn.Item>
        <div className="flex flex-col">
          <p>
            <span className="font-medium text-foreground">I simplify complex system</span> into user-friendly interface through user research and design
            iteration. I've built designs that helps to generate million dollars of revenue.
          </p>
          <div className="flex flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex flex-row items-center justify-center gap-1 text-muted2 text-sm hover:text-foreground hover:underline"
            >
              {copyText}
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>
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
