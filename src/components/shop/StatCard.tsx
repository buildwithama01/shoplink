import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label, value, icon: Icon, accent = "primary",
}: {
  label: string; value: string; icon: LucideIcon;
  accent?: "primary" | "warning" | "muted" | "success";
}) {
  const accentMap = {
    primary: "bg-primary-soft text-primary",
    warning: "bg-warning-soft text-warning-foreground",
    muted: "bg-muted text-muted-foreground",
    success: "bg-success-soft text-success",
  };
  return (
    <Card className="p-5 shadow-sm rounded-xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-bold tracking-tight">{value}</div>
          <div className="text-sm text-muted-foreground mt-1">{label}</div>
        </div>
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", accentMap[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
