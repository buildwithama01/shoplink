"use client";

import { useRouter } from "next/navigation";
import { SellerLayout, SellerTopBar } from "@/components/seller/SellerSidebar";
import { StatusBadge } from "@/components/shop/StatusBadge";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const tabs = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending", filter: "pending" },
  { value: "shipped", label: "Shipped", filter: "shipped" },
  { value: "cancelled", label: "Cancelled", filter: "cancelled" },
];

const formatNGN = (amount: number) => {
  return `₦${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
};

export function ClientOrders({ orders }: { orders: any[] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const renderTable = (list: any[]) => {
    const totalPages = Math.ceil(list.length / itemsPerPage);
    const paginatedOrders = list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="rounded-[20px] border border-border/60 overflow-hidden bg-background mt-5">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
          <tr className="border-b border-border/60 text-left text-muted-foreground text-xs">
            <th className="px-5 py-3 font-medium">Order</th>
            <th className="px-5 py-3 font-medium">Customer</th>
            <th className="px-5 py-3 font-medium hidden sm:table-cell">Items</th>
            <th className="px-5 py-3 font-medium">Total</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium hidden sm:table-cell">Date</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr><td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">No orders found</td></tr>
          ) : paginatedOrders.map((o) => (
            <tr
              key={o.id}
              className="border-b border-border/60 last:border-b-0 hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => router.push(`/seller/orders/${o.id}`)}
            >
              <td className="px-5 py-3 font-medium">#{o.order_number}</td>
              <td className="px-5 py-3 text-muted-foreground">{o.customer_name}</td>
              <td className="px-5 py-3 hidden sm:table-cell">{o.order_items?.length || 0}</td>
              <td className="px-5 py-3 font-medium">{formatNGN(o.total_amount)}</td>
              <td className="px-5 py-3"><StatusBadge status={o.status.charAt(0).toUpperCase() + o.status.slice(1)} /></td>
              <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">
                {new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {list.length > 0 && (
        <div className="p-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <Select value={String(itemsPerPage)} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
              <SelectTrigger className="h-8 w-16 text-xs rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, list.length)} of {list.length}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl h-8" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</Button>
            <Button variant="outline" size="sm" className="rounded-xl h-8" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}>Next</Button>
          </div>
        </div>
      )}
    </div>
  )};

  return (
    <SellerLayout>
      <SellerTopBar
        count={String(orders.length)}
        title="Orders"
        subtitle="Manage incoming orders"
      />
      <div className="p-7">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted rounded-full p-1 h-auto">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-1.5 text-sm capitalize"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((t) => (
            <TabsContent key={t.value} value={t.value}>
              {renderTable(t.filter ? orders.filter((o) => o.status === t.filter) : orders)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SellerLayout>
  );
}
