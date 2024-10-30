import { API_URL } from "@/env";
import { PostType } from "./types";

// Fetch all posts
export const fetchPosts = async (): Promise<PostType[]> => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error(`API request failed! with status: ${response.status}`);
  }
  const data: PostType[] = await response.json();
  return data;
};


// Delete a post by id
export const deletePost = async (id: string): Promise<boolean> => {
    const response = await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`API request failed! with status: ${response.status}`);
    }
    return true;
  };

  // Create a post
export const createPost = async (content: string): Promise<PostType> => {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        date: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error(`API request failed! with status: ${response.status}`);
    }
    const data: PostType = await response.json();
    return data;
  };


  // Edit a post
export const editPost = async (
    id: string,
    content: string,
  ): Promise<PostType> => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error(`API request failed! with status: ${response.status}`);
    }
    const data: PostType = await response.json();
    return data;
  };