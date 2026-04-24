import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  Package,
  ArrowUpRight,
  Plus,
  Copy,
  Check,
} from "lucide-react";
import { SellerLayout, SellerTopBar } from "@/components/seller/SellerSidebar";
import { StatCard } from "@/components/shop/StatCard";
import { StatusBadge } from "@/components/shop/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orders, stats, formatNGN, store } from "@/lib/mock-data";
import { toast } from "sonner";

// ─── Share Store Card ─────────────────────────────────────────────────────────
function ShareStoreCard() {
  const [copied, setCopied] = useState(false);
  const storeUrl = `https://shoplink.com/${store.slug}`;

  const handleCopy = async () => {
    try {
      // Modern Clipboard API
      await navigator.clipboard.writeText(storeUrl);
    } catch {
      // Fallback for non-HTTPS / older browsers
      const el = document.createElement("textarea");
      el.value = storeUrl;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }

    setCopied(true);
    toast.success("Store link copied!", {
      description: storeUrl,
      duration: 2500,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[20px] bg-tile-peach p-6 border border-border/60">
      <div className="text-xs uppercase tracking-wider text-foreground/60 font-medium mb-4">
        Share your store
      </div>

      {/* Store link + copy button */}
      <div className="p-3 bg-background rounded-xl flex items-center justify-between mb-5 border border-border/60">
        <span className="text-sm font-medium truncate flex-1 text-foreground/80">
          shoplink.com/{store.slug}
        </span>
        <button
          onClick={handleCopy}
          title="Copy store link"
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ml-2 shrink-0 ${
            copied
              ? "bg-green-100 text-green-600"
              : "bg-muted hover:bg-muted/70 text-foreground/70"
          }`}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Social share buttons */}
      <div className="grid grid-cols-3 gap-3">
        <a
          href={`https://wa.me/?text=Check out my store! ${storeUrl}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-background/50 hover:bg-background transition-colors"
        >
          <div className="h-10 w-10 rounded-full bg-[#25D366] text-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
            </svg>
          </div>
          <span className="text-[11px] font-medium">WhatsApp</span>
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=Check out my store!&url=${encodeURIComponent(storeUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-background/50 hover:bg-background transition-colors"
        >
          <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </div>
          <span className="text-[11px] font-medium">X</span>
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-background/50 hover:bg-background transition-colors"
        >
          <div className="h-10 w-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </div>
          <span className="text-[11px] font-medium">Facebook</span>
        </a>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SellerDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isComplete = localStorage.getItem("onboarding_complete");
    if (!isComplete) {
      navigate("/seller/onboarding");
    }
  }, [navigate]);

  return (
    <SellerLayout>
      <SellerTopBar
        count={String(stats.totalOrders)}
        title="Orders"
        subtitle="Last 7 days"
        action={
          <>
            <div className="hidden sm:inline-flex items-center gap-1 bg-muted rounded-full p-1">
              <span className="px-3.5 py-1 rounded-full bg-background text-sm font-medium">
                Dashboard
              </span>
              <Link
                to="/seller/orders"
                className="px-3.5 py-1 text-sm text-muted-foreground"
              >
                Website
              </Link>
            </div>
            <Button asChild size="sm" className="gap-1.5">
              <Link to="/seller/products/new">
                <Plus className="h-4 w-4" /> New product
              </Link>
            </Button>
          </>
        }
      />

      <div className="p-7 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total sales"
            value={formatNGN(stats.totalSales)}
            icon={DollarSign}
            accent="primary"
            trend="+12%"
          />
          <StatCard
            label="Total orders"
            value={String(stats.totalOrders)}
            icon={ShoppingBag}
            accent="warning"
            trend="+5"
          />
          <StatCard
            label="Pending orders"
            value={String(stats.pendingOrders)}
            icon={Clock}
            accent="success"
          />
          <StatCard
            label="Products"
            value={String(stats.productsCount)}
            icon={Package}
            accent="muted"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Recent orders table */}
          <div className="lg:col-span-2 rounded-[20px] border border-border/60 overflow-hidden bg-background">
            <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
              <h2 className="font-semibold text-sm">Recent orders</h2>
              <Link
                to="/seller/orders"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                See all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Order</TableHead>
                  <TableHead className="hidden sm:table-cell">Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 5).map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">#{o.orderNumber}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {o.customerName}
                    </TableCell>
                    <TableCell>{formatNGN(o.total)}</TableCell>
                    <TableCell>
                      <StatusBadge status={o.status} />
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs whitespace-nowrap">
                      {o.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Share store */}
          <div className="space-y-5">
            <ShareStoreCard />
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
