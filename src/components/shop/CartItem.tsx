import { Image as ImageIcon, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNGN } from "@/lib/mock-data";

export function CartItem({
  name, variant, price, qty,
}: { name: string; variant: string; price: number; qty: number }) {
  return (
    <div className="flex gap-3 py-4 border-b last:border-b-0">
      <div className="h-20 w-20 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center">
        <ImageIcon className="h-6 w-6 text-muted-foreground/40" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{name}</div>
        <div className="text-xs text-muted-foreground">{variant}</div>
        <div className="text-sm font-semibold text-primary mt-1">{formatNGN(price)}</div>
        <div className="flex items-center gap-2 mt-2">
          <div className="inline-flex items-center border rounded-lg">
            <Button variant="ghost" size="icon" className="h-7 w-7"><Minus className="h-3 w-3" /></Button>
            <span className="px-2 text-sm w-6 text-center">{qty}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="h-3 w-3" /></Button>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
