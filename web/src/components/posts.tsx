import { useEffect } from "react";
  import Post from "./post";
  import { fetchPosts } from "@/data/api";
 import { useStore } from "@nanostores/react";
 import { $posts, setPosts } from "@/lib/store";


 const Posts = () => {
   const posts = useStore($posts);

    useEffect(() => {
      fetchPosts().then((data) => setPosts(data));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div>
        {posts
          .sort((a, b) => (a.date > b.date ? -1 : 1))
          .map((post) => (
           <Post key={post.id} post={post} />
          ))}
      </div>
    );
  };

  export default Posts;