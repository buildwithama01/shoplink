import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";
import { cartItems, store } from "@/lib/mock-data";

export function StoreNavbar() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur border-b">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to={`/${store.slug}`} className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <Store className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg hidden sm:inline">{store.name}</span>
        </Link>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon"><Search className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
              {cartItems.length}
            </span>
          </Button>
        </div>
      </div>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}
