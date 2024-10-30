import { useEffect } from "react";
import { PostType } from "@/data/types";
import Post from "./post";
import { fetchPosts } from "@/data/api";

type PostsActionsProps = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

const Posts = ({ posts, setPosts }: PostsActionsProps) => {
  useEffect(() => {
    fetchPosts().then((data) => setPosts(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {posts
        .sort((a, b) => (a.date > b.date ? -1 : 1))
        .map((post) => (
          <Post key={post.id} post={post} setPosts={setPosts} />
        ))}
    </div>
  );
};

export default Posts;