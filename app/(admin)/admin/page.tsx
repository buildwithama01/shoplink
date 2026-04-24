import { Activity, Store, Users, DollarSign } from "lucide-react";
import { AdminLayout, AdminTopBar } from "@/components/admin/AdminSidebar";
import { StatCard } from "@/components/shop/StatCard";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <AdminTopBar title="Platform Overview" subtitle="Global metrics for ShopLink" />
      <div className="p-7 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total GMV" value="₦45.2M" icon={DollarSign} accent="primary" trend="+24%" />
          <StatCard label="Active Stores" value="1,248" icon={Store} accent="warning" trend="+12" />
          <StatCard label="Total Users" value="45.9k" icon={Users} accent="success" trend="+845" />
          <StatCard label="System Status" value="Healthy" icon={Activity} accent="muted" />
        </div>
        <div className="rounded-[20px] bg-tile-mist p-8 min-h-[300px] flex items-center justify-center border border-border/60">
          <div className="text-center">
            <h3 className="font-semibold text-lg">Charts & Analytics</h3>
            <p className="text-sm text-muted-foreground mt-1">Platform growth charts will be displayed here.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
