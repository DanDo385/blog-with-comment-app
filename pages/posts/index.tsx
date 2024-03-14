// pages/posts/index.tsx
import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import formatFullDate from "../../lib/dateRelative";
import { getAllPosts } from "../../lib/getPost";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // Or `date: Date;` if it's already a Date object
};

export default function NotePage({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      {allPosts.length > 0 ? (
        allPosts.map((post: Post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <a className="mb-10 block">
              <article>
                <h2 className="text-lg leading-6 font-bold">{post.title}</h2>
                <p>{post.excerpt}</p>
                {post.date && (
                  <div className="text-green-300">
                    <time>{formatFullDate(new Date(post.date))}</time>
                  </div>
                )}
              </article>
            </a>
          </Link>
        ))
      ) : (
        <p>No blog posts yet :/</p>
      )}
    </Container>
  );
}

export async function getStaticProps() {
  const allPosts: Post[] = getAllPosts(["slug", "title", "excerpt", "date"]);

  return {
    props: { allPosts },
  };
}
