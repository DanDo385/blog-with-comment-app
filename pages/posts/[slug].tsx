// pages/posts/[slug].tsx
import type { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Comment from "../../components/comment";
import Container from "../../components/container";
import { getAllPosts, getPostBySlug } from "../../lib/getPost";
import { markdownToHtml } from "../../lib/markdownToHtml";
import Head from "next/head";
import formatFullDate from "../../lib/dateRelative";

export default function PostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Head>
        <title>{post.title}</title>
      </Head>

      <Comment postSlug={post.slug} />
              </Container>
            );
          }

          export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'excerpt',
  ]);
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
