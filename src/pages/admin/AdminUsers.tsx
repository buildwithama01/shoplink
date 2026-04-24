import { useState } from "react";
import { AdminLayout, AdminTopBar } from "@/components/admin/AdminSidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const initialUsers = [
  { id: 1, name: "Alex K.", email: "alex@neonsupply.com", phone: "+234 801 234 5678", store: "Neon Supply", joined: "Oct 12, 2026", active: true },
  { id: 2, name: "Sarah M.", email: "sarah@aura.com", phone: "+234 802 345 6789", store: "Aura Essentials", joined: "Oct 14, 2026", active: true },
  { id: 3, name: "James B.", email: "james@urbantech.io", phone: "+234 803 456 7890", store: "Urban Tech", joined: "Oct 15, 2026", active: false },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);

  const toggleUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  return (
    <AdminLayout>
      <AdminTopBar title="Sellers" count={String(users.length)} subtitle="All registered sellers on platform" />
      
      <div className="p-7">
        <div className="rounded-[20px] border border-border/60 overflow-hidden bg-background">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Seller Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{u.email}</span>
                      <span className="text-xs text-muted-foreground">{u.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{u.store}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${u.active ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                      {u.active ? "Active" : "Suspended"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => toggleUser(u.id)}>
                      {u.active ? "Suspend" : "Restore"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
