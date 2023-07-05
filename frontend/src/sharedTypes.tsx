export interface User {
  id: string;
  name: string;
  email: string;
  color: string;
  following: [];
}

export interface Post {
  _id: string;
  textContent: string;
  createdBy: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}
