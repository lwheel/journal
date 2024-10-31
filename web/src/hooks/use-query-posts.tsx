import { useEffect } from "react";
import { fetchPosts } from "@/data/api";
import { useStore } from "@nanostores/react";
import { setPosts, $posts } from "@/lib/store";

function useQueryPosts() {
  const posts = useStore($posts);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts([...fetchedPosts]);
    } catch (error) {
      const errorMessage =
        (error as Error).message ?? "Please try again later!";
      console.error(errorMessage);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return { posts };
}

export default useQueryPosts;