"use client";

import { useState } from "react";
import { SellerLayout, SellerTopBar } from "@/components/seller/SellerSidebar";
import { ImageUploader } from "@/components/shop/ImageUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { store, stats } from "@/lib/mock-data";
import { toast } from "sonner";
import { Zap, TrendingUp, Briefcase, Crown, AlertTriangle, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="rounded-[20px] border border-border/60 p-6"><h2 className="font-semibold text-sm">{title}</h2><div className="mt-4">{children}</div></div>);
}

const PLANS = [
  { id: "starter", name: "Starter", price: "Free", orders: 20, ordersLabel: "20 orders/mo", color: "bg-muted", textColor: "text-foreground", icon: Zap, iconColor: "text-muted-foreground" },
  { id: "hustle", name: "Hustle", price: "₦2,500/mo", orders: 250, ordersLabel: "250 orders/mo", color: "bg-tile-butter", textColor: "text-foreground", icon: TrendingUp, iconColor: "text-amber-600" },
  { id: "business", name: "Business", price: "₦5,000/mo", orders: 1000, ordersLabel: "1,000 orders/mo", color: "bg-tile-sky", textColor: "text-foreground", icon: Briefcase, iconColor: "text-blue-600" },
  { id: "boss", name: "Boss", price: "₦12,000/mo", orders: Infinity, ordersLabel: "Unlimited orders", color: "bg-tile-peach", textColor: "text-foreground", icon: Crown, iconColor: "text-orange-500" },
] as const;

function DeleteAccountDialog({ onClose }: { onClose: () => void }) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText === "DELETE";
  const handleDelete = () => { toast.error("Account deletion requested. Our team will process this within 24 hours."); onClose(); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-background rounded-[24px] border border-border/60 shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-start gap-3"><div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5"><AlertTriangle className="h-5 w-5 text-destructive" /></div><div><h2 className="font-semibold text-base">Delete your account</h2><p className="text-sm text-muted-foreground mt-1">This will permanently delete your store, all products, and order history. This action <strong>cannot</strong> be undone.</p></div></div>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors shrink-0 ml-2"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3"><Label className="text-xs text-muted-foreground">Type <span className="font-mono font-bold text-foreground">DELETE</span> to confirm</Label><Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="DELETE" className="rounded-xl font-mono" autoFocus /></div>
        <div className="flex gap-2 mt-5"><Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Cancel</Button><Button variant="destructive" className="flex-1 rounded-xl" disabled={!isConfirmed} onClick={handleDelete}>Delete account</Button></div>
      </div>
    </div>
  );
}

export default function SellerSettingsPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const currentPlanId = "hustle";
  const currentPlan = PLANS.find((p) => p.id === currentPlanId)!;
  const ordersUsed = stats.totalOrders;
  const ordersLimit = currentPlan.orders === Infinity ? null : currentPlan.orders;
  const usagePercent = ordersLimit ? Math.min((ordersUsed / ordersLimit) * 100, 100) : 0;

  return (
    <>
      <SellerLayout>
        <SellerTopBar title="Settings" subtitle="Configure your store" action={<Button onClick={() => toast.success("Changes saved!")}>Save changes</Button>} />
        <div className="p-7">
          <Tabs defaultValue="general">
            <TabsList className="bg-muted rounded-full p-1 h-auto">
              {["general", "shipping", "payments", "plan", "seo"].map((t) => (<TabsTrigger key={t} value={t} className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-1.5 text-sm capitalize">{t}</TabsTrigger>))}
            </TabsList>
            <TabsContent value="general" className="space-y-5 mt-6">
              <Panel title="Store information"><div className="grid sm:grid-cols-2 gap-4"><div><Label className="text-xs text-muted-foreground">Store name</Label><Input defaultValue={store.name} className="mt-1.5 rounded-xl" /></div><div><Label className="text-xs text-muted-foreground">Store slug</Label><Input defaultValue={store.slug} className="mt-1.5 rounded-xl" /><div className="text-xs text-muted-foreground mt-1.5">shoplink.app/{store.slug}</div></div><div><Label className="text-xs text-muted-foreground">WhatsApp number</Label><Input defaultValue={store.whatsapp} className="mt-1.5 rounded-xl" /></div><div><Label className="text-xs text-muted-foreground">Currency</Label><Select defaultValue="NGN"><SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="NGN">NGN — Nigerian Naira</SelectItem><SelectItem value="USD">USD — US Dollar</SelectItem><SelectItem value="GHS">GHS — Ghanaian Cedi</SelectItem></SelectContent></Select></div></div></Panel>
              <Panel title="Appearance"><div className="space-y-5"><div><Label className="text-xs text-muted-foreground">Logo</Label><div className="mt-1.5"><ImageUploader /></div></div><div><Label className="text-xs text-muted-foreground">Primary color</Label><div className="mt-1.5 flex items-center gap-2"><div className="h-10 w-10 rounded-xl border border-border" style={{ backgroundColor: store.color }} /><Input defaultValue={store.color} className="font-mono w-40 rounded-xl" /></div></div></div></Panel>
              <Panel title="Store status"><div className="space-y-4"><div className="flex items-center justify-between"><div><div className="font-medium text-sm">Store is active</div><div className="text-xs text-muted-foreground mt-0.5">Customers can place orders</div></div><Switch defaultChecked /></div><div className="flex items-center justify-between"><div><div className="font-medium text-sm">Password protected</div><div className="text-xs text-muted-foreground mt-0.5">Require password to view storefront</div></div><Switch /></div></div></Panel>
              <div className="rounded-[20px] border border-destructive/40 p-6"><h2 className="font-semibold text-sm text-destructive">Danger zone</h2><div className="mt-4 flex items-start justify-between gap-4"><div><div className="font-medium text-sm">Delete account</div><div className="text-xs text-muted-foreground mt-0.5">Permanently remove your store, products, and all data.</div></div><Button variant="destructive" size="sm" className="shrink-0" onClick={() => setShowDeleteDialog(true)}>Delete account</Button></div></div>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-5 mt-6">
              <div className="grid md:grid-cols-2 gap-5"><Panel title="Pickup"><div className="space-y-3"><div><Label className="text-xs text-muted-foreground">Label</Label><Input defaultValue="Pickup" className="mt-1.5 rounded-xl" /></div><div className="flex items-center justify-between pt-2"><span className="text-sm font-medium">Active</span><Switch defaultChecked /></div></div></Panel><Panel title="Delivery"><div className="space-y-3"><div><Label className="text-xs text-muted-foreground">Label</Label><Input defaultValue="Delivery" className="mt-1.5 rounded-xl" /></div><div><Label className="text-xs text-muted-foreground">Fee</Label><Input defaultValue="₦5,000" className="mt-1.5 rounded-xl" /></div><div className="flex items-center justify-between pt-2"><span className="text-sm font-medium">Active</span><Switch defaultChecked /></div></div></Panel></div>
              <Panel title="Address fields"><div className="space-y-3">{["Address Line 1", "City", "State", "Postal Code"].map((f) => (<label key={f} className="flex items-center gap-2.5 cursor-pointer"><Checkbox defaultChecked={f !== "Postal Code"} /><span className="text-sm">{f}</span></label>))}</div></Panel>
            </TabsContent>
            <TabsContent value="payments" className="mt-6">
              <Panel title="Payment methods"><div className="space-y-4"><div className="flex items-center justify-between"><div><div className="font-medium text-sm">Cash on delivery</div><div className="text-xs text-muted-foreground mt-0.5">Customer pays on delivery</div></div><Switch defaultChecked /></div><div className="flex items-center justify-between"><div><div className="font-medium text-sm">Bank transfer</div><div className="text-xs text-muted-foreground mt-0.5">Show your bank details on checkout</div></div><Switch defaultChecked /></div><div className="pt-4 border-t border-border/60 mt-4 space-y-4"><h3 className="text-sm font-medium">Bank Transfer Details</h3><div className="grid sm:grid-cols-2 gap-4"><div><Label className="text-xs text-muted-foreground">Bank Name</Label><Input defaultValue="Access Bank" className="mt-1.5 rounded-xl" /></div><div><Label className="text-xs text-muted-foreground">Account Name</Label><Input defaultValue="Neon Supply Ltd" className="mt-1.5 rounded-xl" /></div><div className="sm:col-span-2"><Label className="text-xs text-muted-foreground">Account Number</Label><Input defaultValue="0123456789" className="mt-1.5 rounded-xl" /></div></div></div></div></Panel>
            </TabsContent>
            <TabsContent value="plan" className="mt-6 space-y-5">
              <div className={cn("rounded-[20px] p-6 border border-border/60", currentPlan.color)}>
                <div className="flex items-start justify-between gap-4"><div><div className="text-xs uppercase tracking-wider text-foreground/60 font-medium mb-1">Current plan</div><div className="flex items-center gap-2"><currentPlan.icon className={cn("h-5 w-5", currentPlan.iconColor)} /><span className="text-2xl font-bold">{currentPlan.name}</span></div><div className="text-sm text-muted-foreground mt-1">{currentPlan.price}</div></div><div className="text-right shrink-0"><div className="text-xs text-muted-foreground">Orders this month</div><div className="text-2xl font-bold mt-0.5">{ordersUsed}{ordersLimit && (<span className="text-sm font-normal text-muted-foreground">/{ordersLimit}</span>)}</div></div></div>
                {ordersLimit && (<div className="mt-5"><div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5"><span>Order usage</span><span>{Math.round(usagePercent)}%</span></div><div className="h-2 rounded-full bg-background/60 overflow-hidden"><div className={cn("h-full rounded-full transition-all", usagePercent >= 90 ? "bg-destructive" : usagePercent >= 70 ? "bg-amber-500" : "bg-foreground/70")} style={{ width: `${usagePercent}%` }} /></div>{usagePercent >= 80 && (<div className="mt-2 text-xs text-amber-600 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />You&apos;re approaching your order limit. Consider upgrading.</div>)}</div>)}
              </div>
              <Panel title="Available plans"><div className="grid sm:grid-cols-2 gap-4">{PLANS.map((plan) => { const isCurrent = plan.id === currentPlanId; return (<div key={plan.id} className={cn("relative rounded-2xl border p-5 transition-all", isCurrent ? "border-foreground/30 bg-muted/40" : "border-border hover:border-foreground/20")}>{isCurrent && (<span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-foreground text-background text-[10px] font-semibold px-2 py-0.5 rounded-full"><Check className="h-2.5 w-2.5" /> Current</span>)}<div className="flex items-center gap-2 mb-2"><plan.icon className={cn("h-4 w-4", plan.iconColor)} /><span className="font-semibold text-sm">{plan.name}</span></div><div className="text-xl font-bold">{plan.price}</div><div className="text-xs text-muted-foreground mt-1">{plan.ordersLabel}</div>{!isCurrent && (<Button size="sm" variant="outline" className="mt-4 w-full rounded-xl" onClick={() => toast.info(`Upgrade to ${plan.name} — contact support or pay online.`)}>Upgrade to {plan.name}</Button>)}</div>); })}</div></Panel>
            </TabsContent>
            <TabsContent value="seo" className="mt-6">
              <Panel title="SEO"><div className="space-y-4"><div><Label className="text-xs text-muted-foreground">Meta title</Label><Input defaultValue="Cruz Gadgets — Future Forward Gadgets" className="mt-1.5 rounded-xl" /></div><div><Label className="text-xs text-muted-foreground">Meta description</Label><Input defaultValue="Shop the latest phones, laptops & accessories." className="mt-1.5 rounded-xl" /></div></div></Panel>
            </TabsContent>
          </Tabs>
        </div>
      </SellerLayout>
      {showDeleteDialog && <DeleteAccountDialog onClose={() => setShowDeleteDialog(false)} />}
    </>
  );
}
