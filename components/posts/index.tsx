"use client";
import { Card } from "../card";
import { Link as NextViewTransition } from "next-view-transitions";
import React, { useEffect, useState } from "react";
import type { Post } from "@/types/post";

interface PostProps {
  category: string;
}

export const Posts = ({ category }: PostProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/posts?category=${category}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data.sort((a: Post, b: Post) => {
          return new Date(b.time.created).getTime() - new Date(a.time.created).getTime();
        }));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [category]);

  const Seperator = () => <div className="border-border border-t" />;

  if (isLoading) return null;
  if (posts.length === 0) return null;

  return (
    <div className="mt-6 flex flex-col">
      <NextViewTransition href={`/${category}`} className="flex justify-between">
        <h2 className="py-2 mb-2 capitalize border-b border-border w-full">
          {category} {posts.length > 0 && `(${posts.length})`}
        </h2>
        <Seperator />
      </NextViewTransition>

      {posts.map((post) => (
        <React.Fragment key={post.slug}>
          {/* <Seperator /> */}
          <NextViewTransition href={`/${category}/${post.slug}`} className="flex w-full justify-between py-2">
            <Card
              title={post.title}
              body={post.summary}
              imageSrc={post.media?.thumbnail || '/default-thumbnail.png'}
              cardClassName="w-full"
            />
          </NextViewTransition>
        </React.Fragment>
      ))}
    </div>
  );
};
