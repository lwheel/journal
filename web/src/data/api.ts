import { API_URL } from "../env";
import type {PostType} from "./types";
import type { UserType } from "./types";

// Sign up a user
export const signUp = async (
  name: string,
  username: string,
  password: string,
): Promise<UserType> => {
  const response = await fetch(`${API_URL}/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, password }),
    credentials: "include", 
  });
  if (!response.ok) {
    throw new Error(`API request failed! with status: ${response.status}`);
  }
  const { user }: { user: UserType } = await response.json();
  return user;
};

// Sign in a user
export const signIn = async (
  username: string,
  password: string,
): Promise<UserType> => {
  const response = await fetch(`${API_URL}/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include", 
  });
  if (!response.ok) {
    throw new Error(`API request failed! with status: ${response.status}`);
  }
  const { user }: { user: UserType } = await response.json();
  return user;
};

// Sign out a user
export const signOut = async (): Promise<boolean> => {
  const response = await fetch(`${API_URL}/sign-out`, {
    method: "POST",
    credentials: "include", 
  });
  if (!response.ok) {
    throw new Error(`API request failed! with status: ${response.status}`);
  }
  return true;
};

// Fetch all posts
export const fetchPosts = async (
  page: number = 1,
  limit: number = 20,
  username?: string, // 👈 Look here
): Promise<{ data: PostType[]; total: number }> => {
  const response = await fetch(
    `${API_URL}/posts?page=${page}&limit=${limit}${
      username ? `&username=${username}` : "" // 👈 Look here
    }`,
    { credentials: "include" },
  );
  if (!response.ok) {
    throw new Error(`API request failed! with status: ${response.status}`);
  }
  const { data, total }: { data: PostType[]; total: number } =
    await response.json();
  return { data, total };
};


export const deletePost = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    credentials: "include",  // Add this line
  });
  if (!response.ok) {
    throw new Error(`API request failed! with status: ${response.status}`);
  }
  return true;
};


export const createPost = async (content: string): Promise<PostType> => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
    }),
    credentials: "include",  // Add this line
  });
  if (!response.ok) {
    throw new Error(`API request failed! with status: ${response.status}`);
  }
  const data: PostType = await response.json();
  return data;
};

export const editPost = async (
  id: string,
  content: string,
): Promise<PostType> => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
    credentials: "include",  // Add this line
  });
  if (!response.ok) {
    throw new Error(`API request failed! with status: ${response.status}`);
  }
  const data: PostType = await response.json();
  return data;
};