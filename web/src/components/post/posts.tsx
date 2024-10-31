import Post from "./post";
import useQueryPosts from "@/hooks/use-query-posts";
import InfiniteScroll from "@/components/shared/infinite-scroll";
import { useStore } from "@nanostores/react";
import { 
  $currentPage, 
  $hasMorePosts, 
  $enableFilter  // 👈 Look here
} from "@/lib/store"; 

const Posts = () => {
  const currentPage = useStore($currentPage);
  const hasMorePosts = useStore($hasMorePosts);
  const enableFilter = useStore($enableFilter); // 👈 Look here
  const { posts, loadPosts, isLoading } = useQueryPosts();

  const loadMorePosts = () => {
    loadPosts(currentPage + 1);
  };

  return (
    <div className="space-y-4">
      <InfiniteScroll
        loadMore={loadMorePosts}
        hasMore={hasMorePosts}
        isLoading={isLoading}
        key={enableFilter ? "filtered" : "all"} // 👈 Look here
      >
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
