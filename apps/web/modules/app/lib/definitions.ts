export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface User {
  id: string;
  name: string;
  email: string | null;
  password: string | null;
  emailVerified: string;
  image: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}
