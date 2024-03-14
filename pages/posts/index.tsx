// pages/posts/index.tsx
import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import formatFullDate from "../../lib/dateRelative";
import { getAllPosts } from "../../lib/getPost";

export default function NotePage({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      {allPosts.length > 0 ? (
        allPosts.map((post) => (
          <article key={post.slug} className="mb-10">
            <Link href={`/posts/${post.slug}`}>
              <span className="text-lg leading-6 font-bold">{post.title}</span>
            </Link>
            <p>{post.excerpt}</p>
            {post.date && (
              <div className="text-green-300">
                <time>{formatFullDate(new Date(post.date))}</time>
              </div>
            )}
          </article>
        ))
      ) : (
        <p>No blog posted yet :/</p>
      )}
    </Container>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["slug", "title", "excerpt", "date"]);

  return {
    props: { allPosts },
  };
}
