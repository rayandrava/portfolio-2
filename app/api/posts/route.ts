// pages/api/posts.ts
import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/mdx';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'projects';

  try {
    const posts = getPosts(category);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}