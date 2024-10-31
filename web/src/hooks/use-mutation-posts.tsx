import { createPost, deletePost, editPost } from "@/data/api";
import { addPost, removePost, updatePostContent } from "@/lib/store";

function useMutationPosts() {
  const deletePostById = async (postId: string) => {
    try {
      await deletePost(postId);
      removePost(postId);
    } catch (error) {
      const errorMessage =
        (error as Error).message ?? "Please try again later!";
      console.error(errorMessage);
    }
  };

  const addNewPost = async (content: string) => {
    try {
      if (!content) {
        throw new Error("Content cannot be empty!");
      }
      const newPost = await createPost(content);
      addPost(newPost);
    } catch (error) {
      const errorMessage =
        (error as Error).message ?? "Please try again later!";
      console.error(errorMessage);
    }
  };

  const updatePost = async (postId: string, content: string) => {
    try {
      if (!content) {
        throw new Error("Content cannot be empty!");
      }
      const updatedPost = await editPost(postId, content);
      updatePostContent(updatedPost.id, updatedPost.content);
    } catch (error) {
      const errorMessage =
        (error as Error).message ?? "Please try again later!";
      console.error(errorMessage);
    }
  };

  return {
    deletePostById,
    addNewPost,
    updatePost,
  };
}

export default useMutationPosts;