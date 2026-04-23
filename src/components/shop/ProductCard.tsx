import { Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product, formatNGN, store } from "@/lib/mock-data";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const hasVariants = product.variants.length > 0;
  return (
    <Card className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow group">
      <Link to={`/${store.slug}/p/${product.slug}`} className="block">
        <div className="aspect-square bg-muted flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground/40" />
        </div>
      </Link>
      <div className={compact ? "p-3" : "p-4"}>
        <div className="text-xs text-muted-foreground">{product.brand}</div>
        <Link to={`/${store.slug}/p/${product.slug}`}>
          <div className={`font-semibold mt-0.5 line-clamp-1 ${compact ? "text-sm" : ""}`}>
            {product.name}
          </div>
        </Link>
        <div className={`font-bold text-primary mt-1 ${compact ? "text-sm" : "text-lg"}`}>
          {formatNGN(product.price)}
        </div>
        {!compact && (
          <Button className="w-full mt-3" size="sm">
            {hasVariants ? "See Options" : "Add to Cart"}
          </Button>
        )}
      </div>
    </Card>
  );
}
