import { NavLink } from "react-router-dom";
import {
  Users,
  User,
  UserX,
  HelpCircle,
  MessageCircle,
  LogOut,
  TicketPercent,
  SquareChartGantt,
  BookUser,
  Tag,
  DiamondPercent,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Pending account", icon: User, path: "/pending" },
  { label: "Created account", icon: Users, path: "/created" },
  { label: "Disable account", icon: UserX, path: "/disabled" },
  { label: "Coupon", icon: TicketPercent, path: "/discount" },
  { label: "Assign-tag", icon: Tag, path: "/assign-tag" },
  { label: "Add-Percent", icon: DiamondPercent, path: "/add-percent" },
  {
    label: "Coupon Details",
    icon: SquareChartGantt,
    path: "/discount-table",
  },
  { label: "Coupon user List", icon: BookUser, path: "/coupon-user-list" },
];

const supportItems = [
  { label: "Help Centre", icon: HelpCircle, path: "/help" },
  { label: "Contact us", icon: MessageCircle, path: "/contact" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="flex flex-col justify-between h-screen w-64 bg-white  py-6 border-r border-zinc-200">
      <div className="space-y-2 ">
        {menuItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-2  text-sm font-medium hover:text-[#004368] transition-all",
                isActive && " border-r-4 "
              )
            }
            style={({ isActive }) => ({
              color: isActive ? "#004368" : "#90B4C8",
              borderColor: isActive ? "#004368" : "transparent",
            })}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      <div className="space-y-2 pb-24">
        {supportItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:text-[#004368] transition-all"
            style={{ color: "#90B4C8" }}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-red-500 hover:text-red-600 transition-all bg-zinc-900"
          onClick={() => {
            console.log("Logging out...");
            localStorage.clear("user");
            navigate("/log-in", { replace: true });
            window.location.reload();
          }}
          style={{ backgroundColor: "white", outline: "none" }}
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
