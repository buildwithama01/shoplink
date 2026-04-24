import { LayoutDashboard, Store, Users, Settings, LogOut } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", end: true, icon: LayoutDashboard, label: "Overview" },
  { to: "/admin/stores", icon: Store, label: "Stores" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 p-5 pr-0">
      <div className="flex flex-col h-full bg-ink text-ink-foreground rounded-[24px] border border-border/60 p-5">
        <Link to="/admin" className="flex items-center gap-2.5 px-1">
          <div className="h-8 w-8 rounded-xl bg-background text-foreground flex items-center justify-center text-sm font-bold">
            SL
          </div>
          <div>
            <div className="font-semibold text-sm tracking-tight leading-none">ShopLink Core</div>
            <div className="text-[11px] text-ink-foreground/60 mt-0.5">Super Admin</div>
          </div>
        </Link>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 h-10 rounded-full text-sm transition-colors",
                  isActive
                    ? "bg-background text-foreground font-medium shadow-sm"
                    : "text-ink-foreground/70 hover:text-ink-foreground hover:bg-ink-foreground/10",
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-ink-foreground/10 space-y-1">
          <Link to="/admin/login" className="flex items-center gap-2 px-3 h-9 rounded-full text-sm text-ink-foreground/70 hover:text-ink-foreground hover:bg-ink-foreground/10 transition-colors">
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function AdminTopBar({ title, count, subtitle, action }: { title: string; count?: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 px-4 md:px-7 py-4 md:py-5 border-b border-border/60">
      <div className="flex items-baseline gap-3">
        {count && <span className="text-3xl font-semibold tracking-tight">{count}</span>}
        <div>
          <div className="text-base font-semibold tracking-tight leading-none">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
        </div>
      </div>
      <div className="flex items-center gap-2">{action}</div>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full bg-canvas pb-[72px] md:pb-0">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-3 md:p-5 md:pl-2.5">
        <div className="bg-background rounded-[24px] border border-border/60 min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-2.5rem)] overflow-hidden">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-ink text-ink-foreground border-t border-ink-foreground/10 px-2 py-2 flex items-center justify-around z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 w-14 h-12 rounded-xl text-[10px] font-medium transition-colors",
                isActive
                  ? "bg-background text-foreground"
                  : "text-ink-foreground/70 hover:text-ink-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5 mb-0.5" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
