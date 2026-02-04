import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  UserCircle,
  Scissors,
  Clock,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "Agendamentos", path: "/dashboard/bookings" },
  { icon: Users, label: "Clientes", path: "/dashboard/clients" },
  { icon: UserCircle, label: "Terapeutas", path: "/dashboard/therapists" },
  { icon: Scissors, label: "Serviços", path: "/dashboard/services" },
  { icon: Clock, label: "Horários", path: "/dashboard/slots" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 gradient-sidebar flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              Serenity
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Spa & Massage</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? "active" : ""}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-foreground">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Admin
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              admin@serenity.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
