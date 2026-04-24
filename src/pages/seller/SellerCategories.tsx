import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Tag } from "lucide-react";
import { SellerLayout, SellerTopBar } from "@/components/seller/SellerSidebar";
import { Button } from "@/components/ui/button";
import { categories as initialCategories } from "@/lib/mock-data";
import { toast } from "sonner";

type Category = { id: string; label: string; icon: string };

const tilePalette = [
  "bg-tile-mint",
  "bg-tile-butter",
  "bg-tile-peach",
  "bg-tile-sky",
  "bg-tile-mist",
];

// ─── Dialog ──────────────────────────────────────────────────────────────────
function CategoryDialog({
  mode,
  initial,
  onSave,
  onClose,
}: {
  mode: "add" | "edit";
  initial?: Category;
  onSave: (label: string) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState(initial?.label ?? "");
  const isValid = value.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSave(value.trim());
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-background rounded-[24px] border border-border/60 shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-base">
            {mode === "add" ? "Add category" : "Edit category"}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Category name
            </label>
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. Sneakers"
              className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-xl gap-1.5"
              disabled={!isValid}
            >
              <Check className="h-4 w-4" />
              {mode === "add" ? "Add" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Confirm Delete ───────────────────────────────────────────────────────────
function DeleteDialog({
  category,
  onConfirm,
  onClose,
}: {
  category: Category;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-background rounded-[24px] border border-border/60 shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base">Delete category?</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">{category.label}</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 rounded-xl"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1 rounded-xl"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SellerCategories() {
  const [cats, setCats] = useState<Category[]>(
    initialCategories.filter((c) => c.id !== "all")
  );
  const [dialog, setDialog] = useState<
    | { type: "add" }
    | { type: "edit"; category: Category }
    | { type: "delete"; category: Category }
    | null
  >(null);

  const handleAdd = (label: string) => {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      label,
      icon: "Tag",
    };
    setCats((prev) => [...prev, newCat]);
    toast.success(`"${label}" added`);
    setDialog(null);
  };

  const handleEdit = (label: string) => {
    if (dialog?.type !== "edit") return;
    setCats((prev) =>
      prev.map((c) =>
        c.id === dialog.category.id ? { ...c, label } : c
      )
    );
    toast.success("Category updated");
    setDialog(null);
  };

  const handleDelete = () => {
    if (dialog?.type !== "delete") return;
    setCats((prev) => prev.filter((c) => c.id !== dialog.category.id));
    toast.success(`"${dialog.category.label}" deleted`);
    setDialog(null);
  };

  return (
    <>
      <SellerLayout>
        <SellerTopBar
          title="Categories"
          subtitle="Organize your catalog"
          action={
            <Button
              className="gap-1.5"
              onClick={() => setDialog({ type: "add" })}
            >
              <Plus className="h-4 w-4" /> Add category
            </Button>
          }
        />

        <div className="p-7">
          {cats.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-border py-20 gap-4 text-center">
              <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
                <Tag className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold">No categories yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add your first category to organize your products.
                </p>
              </div>
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => setDialog({ type: "add" })}
              >
                <Plus className="h-4 w-4" /> Add category
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cats.map((c, i) => (
                <div
                  key={c.id}
                  className={`${
                    tilePalette[i % tilePalette.length]
                  } rounded-[20px] p-5 flex items-center justify-between group`}
                >
                  <div>
                    <div className="font-semibold">{c.label}</div>
                    <div className="text-xs text-foreground/60 mt-1">
                      Category
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-background/60"
                      onClick={() => setDialog({ type: "edit", category: c })}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-background/60 text-foreground/60 hover:text-destructive"
                      onClick={() =>
                        setDialog({ type: "delete", category: c })
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add new tile */}
              <button
                onClick={() => setDialog({ type: "add" })}
                className="rounded-[20px] p-5 flex items-center justify-center gap-2 border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all min-h-[82px]"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">New category</span>
              </button>
            </div>
          )}
        </div>
      </SellerLayout>

      {/* Dialogs */}
      {dialog?.type === "add" && (
        <CategoryDialog
          mode="add"
          onSave={handleAdd}
          onClose={() => setDialog(null)}
        />
      )}
      {dialog?.type === "edit" && (
        <CategoryDialog
          mode="edit"
          initial={dialog.category}
          onSave={handleEdit}
          onClose={() => setDialog(null)}
        />
      )}
      {dialog?.type === "delete" && (
        <DeleteDialog
          category={dialog.category}
          onConfirm={handleDelete}
          onClose={() => setDialog(null)}
        />
      )}
    </>
  );
}
