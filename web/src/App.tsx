import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";
import Feed from "@/components/feed";

const DEBUG = false;

function App() {
  return (
    <div className="flex min-h-dvh">
      <div
        className={cn("flex-1 min-w-14", {
          "border-r-2": DEBUG,
        })}
      >
        <Sidebar />
      </div>
      <div className="w-full max-w-md mx-auto md:max-w-lg">
         <Feed />
      </div>
      <div
        className={cn("flex-1", {
          "border-l-2": DEBUG,
        })}
      >
        {/* Placeholder for another sidebar */}
      </div>
    </div>
  );
}

export default App;