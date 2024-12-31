export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorImage: string | null;
  createdAt: Date;
}

export interface UserPostProps
  extends Omit<Post, "author" | "authorImage" | "id"> {
  id?: number;
  author?: string;
  authorImage?: string | null;
}
