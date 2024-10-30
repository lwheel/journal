import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { TrashIcon } from "@radix-ui/react-icons";
  import { PostType } from "@/data/types";
  import { deletePost } from "@/data/api";
 import { removePost } from "@/lib/store";

  type DeletePostDialogProps = {
    post: PostType;
  };

 const DeletePostDialog = ({ post }: DeletePostDialogProps) => {
    const handleDelete = async () => {
      await deletePost(post.id);
     removePost(post.id);
    };

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <TrashIcon className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  export default DeletePostDialog;