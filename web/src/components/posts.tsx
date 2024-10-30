import { useState } from "react";
import { PostType } from "@/data/types";
import db from "@/data/db.json";
import Post from "./post";

const Posts = () => {
  const [posts] = useState<PostType[]>(db.posts);

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