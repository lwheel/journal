import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { redirectPage } from "@nanostores/router";
import { $router } from "@/lib/router";
import useMutationPosts from "@/hooks/use-mutation-posts";
import { useToast } from "@/components/ui/use-toast";

const AddPost = () => {
  const { addNewPost } = useMutationPosts();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const content = formData.get("content") as string;

      if (!content?.trim()) {
        toast({
          variant: "destructive",
          title: "Content cannot be empty 🙁",
          description: "Please enter the content of your post.",
        });
        return;
      }

      await addNewPost(content);
      
      toast({
        title: "Success!",
        description: "Your post has been created.",
      });
      
      // Small delay to ensure the post is processed before redirect
      setTimeout(() => {
        try {
          redirectPage($router, "home");
        } catch (error) {
          console.error("Navigation error:", error);
          // Fallback navigation
          window.location.href = "/";
        }
      }, 100);
      
    } catch (error) {
      console.error("Error submitting post:", error);
      toast({
        variant: "destructive",
        title: "Error creating post",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    try {
      redirectPage($router, "home");
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback navigation
      window.location.href = "/";
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <form className="grid w-full gap-1.5 p-4 border-b" onSubmit={handleFormSubmit}>
        <Label htmlFor="content" className="text-sm">
          Your post
        </Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Type your message here."
          required
          disabled={isSubmitting}
        />
        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;