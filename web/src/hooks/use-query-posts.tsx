import { useEffect, useState } from "react";
import { fetchPosts } from "@/data/api";
import { useStore } from "@nanostores/react";
import {
  $posts,
  appendPosts,
  incrementPage,
  setHasMorePosts,
  setPosts,
  $enableFilter, // 👈 Look here
} from "@/lib/store";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/use-auth"; // 👈 Look here

function useQueryPosts() {
  const posts = useStore($posts);
  const enableFilter = useStore($enableFilter); // 👈 Look here
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth(); // 👈 Look here

  const loadPosts = async (page: number = 1, limit: number = 20) => {
    setIsLoading(true);
    try {
      const { data: fetchedPosts, total } = await fetchPosts(
        page,
        limit,
        enableFilter ? user?.username : undefined, // 👈 Look here
      );
      setHasMorePosts(posts.length + fetchedPosts.length < total);
      if (page === 1) {
        setPosts(fetchedPosts);
      } else {
        appendPosts(fetchedPosts);
        incrementPage();
      }
    } catch (error) {
      const errorMessage =
        (error as Error).message ?? "Please try again later!";
      toast({
        variant: "destructive",
        title: "Sorry! There was an error reading the posts 🙁",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(1); // Reset to first page when filter changes
  }, [enableFilter]); // 👈 Look here

  return { posts, loadPosts, isLoading };
}

export default useQueryPosts;