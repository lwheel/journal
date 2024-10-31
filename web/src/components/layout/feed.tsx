// web/src/components/layout/feed.tsx
import Header from "./header";
import { useStore } from "@nanostores/react";
import { $showAddPost} from "@/lib/store";
import AddPost from "@/components/post/add-post";
import Posts from "@/components/post/posts";

const Feed = ({ postId }: { postId: string | null }) => { // 👀 Look here
  const showNewPostEditor = useStore($showAddPost);

  if (!postId) {
    return (
      <div className="flex flex-col w-full min-h-screen border-x">
        <Header />
        {showNewPostEditor && <AddPost />}
        <Posts />
      </div>
    );
  }

  // 👆 Look here 👇

  return (
    <div className="flex flex-col w-full min-h-screen border-x">
      <Header />
    </div>
  );
};

export default Feed;