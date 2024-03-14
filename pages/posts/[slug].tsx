// pages/posts/[slug].tsx
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Container from '../../components/container';
import { getPostBySlug, getAllPosts } from '../../lib/getPost';
import CommentSection from '../../components/comment';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { user, isAuthenticated } = useAuth0();
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && router.query.loginSuccess) {
      setShowLoginSuccess(true);
      // Optionally, remove the loginSuccess query parameter from the URL
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [isAuthenticated, router]);

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <Container>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        {showLoginSuccess && <div>Welcome back, {user?.name}!</div>}
        <CommentSection postSlug={post.slug ?? ''} />
      </article>
    </Container>
  );
}

export async function getStaticProps({ params }: { params: any }) {
  const post = getPostBySlug(params.slug, ['slug', 'title', 'excerpt', 'content']);
  const content = await markdownToHtml({ markdown: post.content || '' });

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}
