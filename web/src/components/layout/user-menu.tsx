import { openPage } from "@nanostores/router";
import { Button } from "../ui/button";
import { $router } from "@/lib/router";
import useAuth from "@/hooks/use-auth";

const UserMenu = () => {
  const { user, logout } = useAuth();

  const navigateToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openPage($router, "login");
  };

  if (!user.name) {
    return (
      <div className="space-y-2 m-3">
        <div>Welcome to Posts!</div>
        <Button onClick={navigateToLogin}>Sign in</Button>
      </div>
    );
  }

  return (
    <div className="space-y-2 m-3">
      <div>{`Welcome, ${user.name}!`}</div>
      <Button variant={"secondary"} onClick={() => logout()}>
        Sign out
      </Button>
    </div>
  );
};

export default UserMenu;
