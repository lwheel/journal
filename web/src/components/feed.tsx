import { useState } from "react";
import { PostType } from "@/data/types";
import AddPost from "./add-post";
import Header from "./header";
import Posts from "./posts";

type FeedProps = {
  showAddPost: boolean;
  setShowAddPost: React.Dispatch<React.SetStateAction<boolean>>;
};

const Feed = ({ showAddPost, setShowAddPost }: FeedProps) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  return (
    <div className="flex flex-col w-full min-h-screen border-x">
      <Header />
      {showAddPost && (
        <AddPost setPosts={setPosts} setShowAddPost={setShowAddPost} />
      )}
      <Posts posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default Feed;