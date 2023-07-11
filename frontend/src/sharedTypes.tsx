export interface UserWithPosts {
  id: string;
  name: string;
  email: string;
  color: string;
  following: [];
  posts: Post[];
}

export interface Post {
  _id: string;
  textContent: string;
  createdBy: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface User extends Omit<UserWithPosts, 'posts'> {}
