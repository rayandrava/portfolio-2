import type { Post } from "@/types";

import { TableOfContents } from "@/components/on-this-page";
import { PostNavigation } from "@/components/post-navigation";
import { formatter } from "@/lib/formatter";
import { getPosts } from "@/lib/mdx";
import { MDX } from "@/mdx-components";

import React from "react";
import { readingTime } from "reading-time-estimator";

interface Props {
  post: Post;
  route: string;
}

export const Layout = ({ post, route }: Props) => {
  const posts = getPosts(route);

  const Seperator = () => {
    return <div className="hidden md:block">⋅</div>;
  };

  const PublishedTime = () => {
    return <div>Published {formatter.date(new Date(post.time.created))}</div>;
  };
  const UpdateTime = () => {
    return <div>Updated {formatter.date(new Date(post.time.updated))}</div>;
  };

  const ReadingTime = () => {
    return <div>{readingTime(post.content).minutes} minutes read</div>;
  };

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div>
          <h1 className="mb-2 font-semibold text-xl">{post.title}</h1>
        </div>
        <div className="mt-1 flex-wrap gap-0 text-muted text-small md:flex md:gap-2 ">
          <PublishedTime />
          <Seperator />
          <UpdateTime />
          <Seperator />
          <ReadingTime />
        </div>
      </div>

      <MDX source={post.content} />
      <PostNavigation posts={posts} />
      <TableOfContents />
    </React.Fragment>
  );
};
