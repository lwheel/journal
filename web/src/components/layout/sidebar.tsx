import {
  ChatBubbleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";
import {
  $showAddPost,
  toggleAddPost,
} from "@/lib/store";
import { $router } from "@/lib/router";
import { openPage } from "@nanostores/router";
import useAuth from "@/hooks/use-auth";  // 👈 Look here
import { toast } from "@/components/ui/use-toast"; // 👈 Look here

const Sidebar = () => {
  const page = useStore($router);
  const showAddPost = useStore($showAddPost);
  const { user } = useAuth(); // 👈 Look here

  // Look here 👇
  const authGuard = () => {
    if (user.username) return true;
    toast({
      variant: "destructive",
      title: "Sorry! You need to be signed in to do that 🙁",
      description: "Please sign in or create an account to continue.",
    });
    return false;
  };

  const navigateHome = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openPage($router, "home");
  };

  if (!page) return null;

  return (
    <div className="flex flex-col items-end p-2 space-y-2">
      <Button
        aria-label={"Home"}
        variant="ghost"
        size="icon"
        onClick={navigateHome}
      >
        <HomeIcon className="w-5 h-5" />
      </Button>
      {page.route === "home" && !showAddPost && (
        <Button
          aria-label={"Make an Entry"}
          variant="default"
          size="icon"
          onClick={() => {
            authGuard() && toggleAddPost(); // 👈 Look here
          }}
        >
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      )}
      
    </div>
  );
};

export default Sidebar;