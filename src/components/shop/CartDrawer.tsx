import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { cartItems, formatNGN, store } from "@/lib/mock-data";

export function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({cartItems.length} items)</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{formatNGN(subtotal)}</span>
          </div>
          <Button asChild className="w-full" size="lg" onClick={() => onOpenChange(false)}>
            <Link to={`/${store.slug}/checkout`}>Proceed to Checkout</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
