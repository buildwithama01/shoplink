"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { SellerLayout, SellerTopBar } from "@/components/seller/SellerSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const initialCategories = [
  { id: "phones", label: "Phones", count: 3 },
  { id: "laptops", label: "Laptops", count: 1 },
  { id: "accessories", label: "Accessories", count: 2 },
  { id: "audio", label: "Audio", count: 2 },
];

export default function SellerCategoriesPage() {
  const [cats, setCats] = useState(initialCategories);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const addCategory = () => {
    if (!newName.trim()) return;
    const id = newName.toLowerCase().replace(/\s+/g, "-");
    setCats([...cats, { id, label: newName.trim(), count: 0 }]);
    toast.success(`"${newName.trim()}" added`);
    setNewName(""); setAdding(false);
  };

  const startEdit = (cat: typeof cats[number]) => { setEditingId(cat.id); setEditName(cat.label); };
  const saveEdit = (id: string) => {
    if (!editName.trim()) return;
    setCats(cats.map((c) => c.id === id ? { ...c, label: editName.trim() } : c));
    toast.success("Category updated");
    setEditingId(null);
  };

  const deleteCategory = (id: string) => {
    const name = cats.find((c) => c.id === id)?.label;
    setCats(cats.filter((c) => c.id !== id));
    toast.success(`"${name}" deleted`);
  };

  return (
    <SellerLayout>
      <SellerTopBar
        count={String(cats.length)}
        title="Categories"
        subtitle="Organize your products"
        action={<Button className="gap-2" onClick={() => setAdding(true)}><Plus className="h-4 w-4" /> Add category</Button>}
      />
      <div className="p-7">
        <div className="rounded-[20px] border border-border/60 overflow-hidden bg-background divide-y divide-border/60">
          {cats.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors">
              {editingId === cat.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="rounded-xl h-9 max-w-xs" autoFocus onKeyDown={(e) => e.key === "Enter" && saveEdit(cat.id)} />
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => saveEdit(cat.id)}><Check className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
                </div>
              ) : (
                <>
                  <div><div className="font-medium text-sm">{cat.label}</div><div className="text-xs text-muted-foreground mt-0.5">{cat.count} products</div></div>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => startEdit(cat)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteCategory(cat.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </>
              )}
            </div>
          ))}
          {adding && (
            <div className="px-5 py-4 flex items-center gap-2">
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Category name" className="rounded-xl h-9 max-w-xs" autoFocus onKeyDown={(e) => e.key === "Enter" && addCategory()} />
              <Button size="sm" onClick={addCategory}>Add</Button>
              <Button size="sm" variant="ghost" onClick={() => { setAdding(false); setNewName(""); }}>Cancel</Button>
            </div>
          )}
        </div>
      </div>
    </SellerLayout>
  );
}
