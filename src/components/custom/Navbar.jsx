import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellRing } from "lucide-react";

import image from "@/constants/image";
const navData = [
  { label: "Log In", path: "/log-in" },
  { label: "Sign up", path: "/sign-up" },
];

export default function Navbar() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  return (
    <nav className="w-full flex justify-between px-20 py-5  items-center">
      <div>
        <NavLink to="/" className="flex items-center gap-2">
          <img src={image.log} alt="logo" className=" h-10" />
        </NavLink>
      </div>
      <div className="flex gap-6 items-center justify-center">
        <div>
          <BellRing />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-2 p-3 text-sm">
            {navData.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                style={({ isActive }) => ({
                  color: isActive ? "#004368" : "#90B4C8",
                  borderColor: isActive ? "black" : "transparent",
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {user?.name && (
          <div>
            <p className="text-xl font-bold">{user.name}</p>
          </div>
        )}
      </div>
    </nav>
  );
}
