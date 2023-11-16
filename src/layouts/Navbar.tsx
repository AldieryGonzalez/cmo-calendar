import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/utilities/useAuth";
import { googleSignIn, signOut } from "@/utilities/supabase";
import type { SupabaseClient, Session } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface ReqsSupabase {
  supabase: SupabaseClient;
}
interface AuthComponent {
  user: Session;
  supabase: SupabaseClient;
}
interface NavContentProps {
  user: Session | null;
  supabase: SupabaseClient;
}
const SignInButton: React.FC<ReqsSupabase> = ({ supabase }) => {
  return (
    <button
      onClick={() => googleSignIn(supabase)}
      className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-purple-900 lg:mt-0"
    >
      Sign In
    </button>
  );
};
const UserContents: React.FC<AuthComponent> = ({ user, supabase }) => {
  const userName = user.user.user_metadata.full_name.split(" ")[0];
  return (
    <>
      {/* md + Nav */}
      <div className="flex items-center justify-start gap-6">
        <NavLink
          to="/home"
          className="hidden text-base font-medium text-white md:block"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/shifts"
          className="hidden text-base font-medium text-white md:block"
        >
          Shifts
        </NavLink>
        <NavLink
          to="/messages"
          className="hidden text-base font-medium text-white md:block"
        >
          Messages
        </NavLink>
        <NavLink
          to="/calendar"
          className="hidden text-base font-medium text-white md:block"
        >
          Calendar
        </NavLink>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <div className=" hidden items-center  justify-start gap-0.5 rounded-full border-black border-opacity-10 bg-purple-900 md:flex ">
                <img
                  className="mr-2 h-8 w-8 rounded-full"
                  src={user.user.user_metadata.avatar_url}
                  alt="Profile photo"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/256px-Default_pfp.svg.png";
                    e.currentTarget.onerror = null;
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="white"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.658l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </div>
              <div className="md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="white"
                  className="bi bi-list"
                  strokeWidth="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 11.5A.5.5 0 0 0 3 12h10a.5.5 0 0 0 0-1H3a.5.5 0 0 0-.5.5zm0-4A.5.5 0 0 0 3 8h10a.5.5 0 0 0 0-1H3a.5.5 0 0 0-.5.5zm0-4A.5.5 0 0 0 3 4h10a.5.5 0 0 0 0-1H3a.5.5 0 0 0-.5.5z"
                  />
                </svg>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Welcome, {userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="md:hidden">
              <DropdownMenuItem asChild>
                <Link to="/home">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shifts">Shifts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/messages">Messages</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/calendar">Calendar</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut(supabase)}
              className="text-red-500"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

const NavContents: React.FC<NavContentProps> = ({ user, supabase }) => {
  return user !== null ? (
    <UserContents user={user} supabase={supabase} />
  ) : (
    <SignInButton supabase={supabase} />
  );
};

const Navbar = () => {
  const { session } = useAuth();
  const supabase = useSupabaseClient();

  return (
    <div className="inline-flex w-full basis-14 items-center justify-between bg-purple-900 px-8 py-2.5">
      <Link to={"/"} className="text-xl font-semibold text-white">
        Northwestern CMO
      </Link>
      <NavContents user={session} supabase={supabase} />
    </div>
  );
};

export default Navbar;
