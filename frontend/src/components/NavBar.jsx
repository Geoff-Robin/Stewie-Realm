import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar() {
  const { loginWithRedirect, user, isLoading } = useAuth0();
  return (
    <header className="lg:sticky top-0 w-full z-50 flex p-2 pr-3 justify-between items-center bg-background">
      <Link className="flex flex-row items-center" to="/">
        <div className="ml-4 text-lg font-bold whitespace-nowrap font-forum">
          Stewie's Realm
        </div>
      </Link>
      <div className="flex items-center gap-3">
        {!isLoading && !user && (
          <RainbowButton
            onClick={() =>
              loginWithRedirect({
                appState: { returnTo: "/chat" },
              })
            }
            className="w-auto flex flex-row justify-center gap-2 items-center font-forum"
          >
            <LogIn size={16} /> Login
          </RainbowButton>
        )}
      </div>
    </header>
  );
}
