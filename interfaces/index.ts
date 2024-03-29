//interfaces/index.ts
export type User = {
  name: string;
  picture: string;
  sub: string;
  email?: string;
};

export type Comment = {
  id: string;
  created_at: number;
  url: string;
  text: string;
  user: User;
};

export type Post = {
  slug?: string;
  title?: string; // Include title
  author?: string;
  date?: Date; // Include date
  content?: string;
  excerpt?: string; // Include excerpt
  [key: string]: any;
};

