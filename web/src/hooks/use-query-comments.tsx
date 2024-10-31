import { useEffect } from "react";
import { fetchComments } from "@/data/api";
import { useStore } from "@nanostores/react";
import { setComments, $comments, $enableFilter } from "@/lib/store";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/use-auth"; // 👈 Look here
 
function useQueryComments(postId: string) {
  const comments = useStore($comments);
  const { user } = useAuth(); // 👈 Look here
  const enableFilter = useStore($enableFilter); // 👈 Look here
 
  const loadComments = async (page: number = 1, limit: number = 20) => {
    try {
      const fetchedComments = await fetchComments(
        postId,
        page,
        limit,
        enableFilter ? user?.username : undefined, // 👈 Look here
      );
      setComments([...fetchedComments]);
    } catch (error) {
      const errorMessage =
        (error as Error).message ?? "Please try again later!";
      toast({
        variant: "destructive",
        title: "Sorry! There was an error reading the comments 🙁",
        description: errorMessage,
      });
    }
  };
 
  useEffect(() => {
    loadComments(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, enableFilter]); // 👈 Look here
 
  return { comments };
}
 
export default useQueryComments;

