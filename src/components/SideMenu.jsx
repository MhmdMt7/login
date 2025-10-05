import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Shield,
  Settings,
} from "lucide-react";

export default function SideMenu() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: <LayoutDashboard size={18} /> },
    { to: "/pos", label: "POS", icon: <ShoppingCart size={18} /> },
    { to: "/admin", label: "Admin", icon: <Shield size={18} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-[260px] h-screen bg-gradient-to-b from-emerald-600 via-teal-600 to-blue-700 text-white flex flex-col p-6 shadow-2xl">
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 text-center tracking-wide">
        🏥 MedCare
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg transition-all
              ${
                location.pathname === link.to
                  ? "bg-white text-teal-700 font-semibold shadow-md"
                  : "hover:bg-teal-800 hover:shadow"
              }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center text-xs text-teal-200">
        © 2025 مديرية الشئون الصحية بكفلاالشيخ . جميع الحقوق محفوظة.
      </div>
    </div>
  );
}

