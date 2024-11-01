import useAuth from "@/hooks/use-auth";
import { $router } from "@/lib/router";
import { cn } from "@/lib/utils";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { $enableFilter, setEnableFilter } from "@/lib/store";

const Header = () => {
  const enableFilter = useStore($enableFilter);
  const page = useStore($router);
  const [label, setLabel] = useState<string>("Posts");
  const { user } = useAuth();
  const showUserFilter = !!user && !!user.username;

  // Automatically enable filter when `showUserFilter` is true
  useEffect(() => {
    if (showUserFilter) {
      setEnableFilter(true);
    }
  }, [showUserFilter]);

  // Set the label based on the current page route
  useEffect(() => {
    if (page?.route === "post") {
      setLabel("Comments");
    } else {
      setLabel("Entries");
    }
  }, [page]);

  if (!page) return null;

  return (
    <div className="flex justify-center gap-3 p-1 border-b">
      {showUserFilter && (
        <span
          className={cn({
            underline: enableFilter,
            "text-primary": enableFilter,
            "text-primary/60": !enableFilter,
          })}
        >{`My ${label}`}</span>
      )}
    </div>
  );
};

export default Header;
