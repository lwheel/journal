import type { CommentType } from "@/data/types";
import CommentActions from "./comment-actions";
import { useState } from "react";
import EditComment from "./edit-comment";
import Author from "../shared/author";

const Comment = ({ comment }: { comment: CommentType }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <EditComment comment={comment} setIsEditing={setIsEditing} />;
  }

  return (
    <div className="p-1 border-b">
      <div className="flex items-center justify-between pl-4">
        <div>
          <h4 className="text-xs text-muted-foreground">
            {new Date(comment.date).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </h4>
          <Author author={comment.author} />
        </div>

        <CommentActions comment={comment} setIsEditing={setIsEditing} />
      </div>

      <p className="p-4">{comment.content}</p>
    </div>
  );
};

export default Comment;
