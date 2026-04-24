"use client";

import { useState } from "react";
import { AdminLayout, AdminTopBar } from "@/components/admin/AdminSidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Zap, TrendingUp, Briefcase, Crown, AlertTriangle, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  { id: "starter", name: "Starter", price: "Free", orders: "20 orders", icon: Zap, color: "bg-muted", badge: "bg-zinc-100 text-zinc-700" },
  { id: "hustle", name: "Hustle", price: "₦2,500/mo", orders: "250 orders", icon: TrendingUp, color: "bg-tile-butter", badge: "bg-amber-100 text-amber-700" },
  { id: "business", name: "Business", price: "₦5,000/mo", orders: "1,000 orders", icon: Briefcase, color: "bg-tile-sky", badge: "bg-blue-100 text-blue-700" },
  { id: "boss", name: "Boss", price: "₦12,000/mo", orders: "Unlimited", icon: Crown, color: "bg-tile-peach", badge: "bg-orange-100 text-orange-700" },
] as const;

type PlanId = typeof PLANS[number]["id"];

const initialStores = [
  { id: 1, name: "Neon Supply", owner: "Alex K.", email: "alex@neonsupply.com", phone: "+234 801 234 5678", status: "Active", revenue: "₦1.2M", plan: "hustle" as PlanId },
  { id: 2, name: "Aura Essentials", owner: "Sarah M.", email: "sarah@aura.com", phone: "+234 802 345 6789", status: "Active", revenue: "₦450k", plan: "starter" as PlanId },
  { id: 3, name: "Urban Tech", owner: "James B.", email: "james@urbantech.io", phone: "+234 803 456 7890", status: "Inactive", revenue: "₦0", plan: "starter" as PlanId },
];

function PlanBadge({ planId }: { planId: PlanId }) {
  const plan = PLANS.find((p) => p.id === planId)!;
  const Icon = plan.icon;
  return (<span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold", plan.badge)}><Icon className="h-3 w-3" />{plan.name}</span>);
}

function ChangePlanDialog({ store, onSave, onClose }: { store: typeof initialStores[number]; onSave: (planId: PlanId) => void; onClose: () => void }) {
  const [selected, setSelected] = useState<PlanId>(store.plan);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-background rounded-[24px] border border-border/60 shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-5"><div><h2 className="font-semibold text-base">Change plan</h2><p className="text-sm text-muted-foreground mt-0.5">{store.name}</p></div><button onClick={onClose} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors"><X className="h-4 w-4" /></button></div>
        <div className="space-y-2">
          {PLANS.map((plan) => { const Icon = plan.icon; const isSelected = selected === plan.id; return (
            <button key={plan.id} onClick={() => setSelected(plan.id)} className={cn("w-full flex items-center gap-3 rounded-2xl border p-4 text-left transition-all", isSelected ? "border-foreground/30 bg-muted/50" : "border-border hover:border-foreground/20")}>
              <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", plan.color)}><Icon className="h-4 w-4" /></div>
              <div className="flex-1 min-w-0"><div className="font-semibold text-sm">{plan.name}</div><div className="text-xs text-muted-foreground">{plan.orders} · {plan.price}</div></div>
              <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all", isSelected ? "border-foreground bg-foreground" : "border-border")}>{isSelected && <div className="h-2 w-2 rounded-full bg-background" />}</div>
            </button>
          ); })}
        </div>
        <div className="flex gap-2 mt-5"><Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button><Button className="flex-1 rounded-xl" onClick={() => onSave(selected)} disabled={selected === store.plan}>Save plan</Button></div>
      </div>
    </div>
  );
}

function DeleteStoreDialog({ store, onConfirm, onClose }: { store: typeof initialStores[number]; onConfirm: () => void; onClose: () => void }) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText === store.name;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-background rounded-[24px] border border-border/60 shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-3 mb-5"><div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5"><AlertTriangle className="h-5 w-5 text-destructive" /></div><div className="flex-1"><h2 className="font-semibold text-base">Delete store</h2><p className="text-sm text-muted-foreground mt-1">This will permanently delete <strong>{store.name}</strong> and all associated data. This cannot be undone.</p></div><button onClick={onClose} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors shrink-0"><X className="h-4 w-4" /></button></div>
        <div className="space-y-2 mb-5"><label className="text-xs text-muted-foreground">Type <span className="font-mono font-bold text-foreground">{store.name}</span> to confirm</label><input autoFocus value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder={store.name} className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none focus:border-destructive/50 focus:ring-2 focus:ring-destructive/20 transition-all" /></div>
        <div className="flex gap-2"><Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button><Button variant="destructive" className="flex-1 rounded-xl" disabled={!isConfirmed} onClick={onConfirm}>Delete store</Button></div>
      </div>
    </div>
  );
}

function ActionMenu({ store, onToggle, onChangePlan, onDelete }: { store: typeof initialStores[number]; onToggle: () => void; onChangePlan: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setOpen((v) => !v)}>Actions <ChevronDown className="h-3.5 w-3.5" /></Button>
      {open && (<><div className="fixed inset-0 z-10" onClick={() => setOpen(false)} /><div className="absolute right-0 top-full mt-1 z-20 w-44 rounded-2xl border border-border bg-background shadow-lg p-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
        <button className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-muted transition-colors" onClick={() => { onToggle(); setOpen(false); }}>{store.status === "Active" ? "Deactivate" : "Activate"}</button>
        <button className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-muted transition-colors" onClick={() => { onChangePlan(); setOpen(false); }}>Change plan</button>
        <div className="my-1 border-t border-border/60" />
        <button className="w-full text-left px-3 py-2 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors" onClick={() => { onDelete(); setOpen(false); }}>Delete store</button>
      </div></>)}
    </div>
  );
}

export default function AdminStoresPage() {
  const [stores, setStores] = useState(initialStores);
  const [planDialog, setPlanDialog] = useState<typeof initialStores[number] | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<typeof initialStores[number] | null>(null);

  const toggleStatus = (id: number) => {
    setStores((prev) => prev.map((s) => s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s));
    const s = stores.find((s) => s.id === id)!;
    toast.success(`${s.name} ${s.status === "Active" ? "deactivated" : "activated"}`);
  };
  const changePlan = (id: number, planId: PlanId) => {
    setStores((prev) => prev.map((s) => (s.id === id ? { ...s, plan: planId } : s)));
    toast.success(`${stores.find((s) => s.id === id)!.name} moved to ${PLANS.find((p) => p.id === planId)!.name}`);
    setPlanDialog(null);
  };
  const deleteStore = (id: number) => {
    const name = stores.find((s) => s.id === id)!.name;
    setStores((prev) => prev.filter((s) => s.id !== id));
    toast.error(`${name} has been deleted`);
    setDeleteDialog(null);
  };

  return (
    <>
      <AdminLayout>
        <AdminTopBar title="Manage Stores" count={String(stores.length)} subtitle="All registered sellers" />
        <div className="p-7">
          <div className="rounded-[20px] border border-border/60 overflow-hidden bg-background">
            <Table>
              <TableHeader><TableRow className="hover:bg-transparent"><TableHead>Store Name</TableHead><TableHead>Contact Info</TableHead><TableHead>Plan</TableHead><TableHead>Revenue</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {stores.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-semibold">{s.name}</TableCell>
                    <TableCell><div className="flex flex-col"><span className="font-medium text-sm">{s.owner}</span><span className="text-[11px] text-muted-foreground">{s.email}</span><span className="text-[11px] text-muted-foreground">{s.phone}</span></div></TableCell>
                    <TableCell><PlanBadge planId={s.plan} /></TableCell>
                    <TableCell className="font-medium">{s.revenue}</TableCell>
                    <TableCell><span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", s.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>{s.status}</span></TableCell>
                    <TableCell className="text-right"><ActionMenu store={s} onToggle={() => toggleStatus(s.id)} onChangePlan={() => setPlanDialog(s)} onDelete={() => setDeleteDialog(s)} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </AdminLayout>
      {planDialog && <ChangePlanDialog store={planDialog} onSave={(planId) => changePlan(planDialog.id, planId)} onClose={() => setPlanDialog(null)} />}
      {deleteDialog && <DeleteStoreDialog store={deleteDialog} onConfirm={() => deleteStore(deleteDialog.id)} onClose={() => setDeleteDialog(null)} />}
    </>
  );
}
