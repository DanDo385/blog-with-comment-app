//lib/getPost.ts 
import type { Post } from "../interfaces";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Partial<Post> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items as Post;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // Filter posts without a valid date
    .filter((post) => post.date !== undefined) // Check if date is not undefined
    // sort posts by date in descending order
    .sort((post1, post2) => {
      // Assuming date is always in string format 'YYYY-MM-DD'
      const date1 = post1.date ? new Date(post1.date) : new Date();
      const date2 = post2.date ? new Date(post2.date) : new Date();
      return date2.getTime() - date1.getTime();
    });
  return posts;
}
