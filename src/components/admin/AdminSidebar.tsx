import { LayoutDashboard, Package, Tag, ShoppingBag, Settings, ExternalLink, Store } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { store } from "@/lib/mock-data";

const navItems = [
  { to: "/admin", end: true, icon: LayoutDashboard, label: "Home" },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/categories", icon: Tag, label: "Categories" },
  { to: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 border-r bg-sidebar h-screen sticky top-0">
      <div className="p-5 border-b">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <Store className="h-4 w-4" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">ShopLink</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t">
        <Link
          to={`/${store.slug}`}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          View Store
        </Link>
      </div>
    </aside>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
