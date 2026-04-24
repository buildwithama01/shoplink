import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, MessageCircle, ArrowLeft, Package, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoreNavbar } from "@/components/shop/StoreNavbar";
import { cartItems, formatNGN } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function OrderConfirmation() {
  const { storeSlug } = useParams();
  
  // Calculate totals
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingFee = 5000; // Mock shipping fee
  const total = subtotal + shippingFee;
  const orderNumber = "SL-" + Math.floor(100000 + Math.random() * 900000);

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    let message = `*New Order: ${orderNumber}*\n\n`;
    message += `*Items:*\n`;
    cartItems.forEach((item) => {
      message += `- ${item.qty}x ${item.name} (${formatNGN(item.price * item.qty)})\n`;
    });
    message += `\n*Subtotal:* ${formatNGN(subtotal)}`;
    message += `\n*Shipping:* ${formatNGN(shippingFee)}`;
    message += `\n*Total:* ${formatNGN(total)}\n\n`;
    message += `Please confirm my order. Thank you!`;
    
    return `https://wa.me/2348012345678?text=${encodeURIComponent(message)}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas">
      <StoreNavbar />
      
      <main className="container max-w-3xl py-12 px-4">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-soft text-success mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            Your order <span className="font-semibold text-foreground">#{orderNumber}</span> has been placed successfully. 
            One last step to finalize everything!
          </p>
        </div>

        <div className="grid gap-6">
          {/* WhatsApp Action Card */}
          <div className="shell p-8 text-center bg-ink text-ink-foreground shadow-xl shadow-ink/10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
            <h3 className="text-xl font-semibold mb-2">Finalize on WhatsApp</h3>
            <p className="text-ink-foreground/70 text-sm mb-6 max-w-sm mx-auto">
              To complete your purchase and arrange delivery, please send your order summary to our WhatsApp line.
            </p>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-success hover:bg-success/90 text-white gap-2 h-14 px-8 text-lg rounded-2xl transition-all hover:scale-105 active:scale-95"
              asChild
            >
              <a href={generateWhatsAppMessage()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-6 h-6" />
                Send to WhatsApp
              </a>
            </Button>
          </div>

          {/* Order Details */}
          <div className="shell overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex justify-between items-center">
              <h3 className="font-semibold">Order Summary</h3>
              <span className="text-xs font-medium bg-background px-2.5 py-1 rounded-full border border-border">
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            
            <div className="p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border">
                      <Package className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p className="font-semibold">{formatNGN(item.price * item.qty)}</p>
                </div>
              ))}
              
              <div className="pt-4 border-t border-dashed border-border mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatNGN(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatNGN(shippingFee)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-xl font-bold text-foreground">{formatNGN(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500 fill-mode-both">
            <div className="shell p-5 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Fast Delivery</h4>
                <p className="text-xs text-muted-foreground mt-1">Expect your items within 2-5 business days after confirmation.</p>
              </div>
            </div>
            <div className="shell p-5 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Secure Payment</h4>
                <p className="text-xs text-muted-foreground mt-1">Your payment details are protected with bank-grade security.</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 animate-in fade-in duration-1000 delay-700 fill-mode-both">
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <Link to={`/${storeSlug}`} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Store
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
