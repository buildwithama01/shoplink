import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas font-sans selection:bg-primary/20">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-canvas/80 backdrop-blur-xl border-b border-border/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-ink text-ink-foreground flex items-center justify-center text-sm font-bold shadow-sm">
              S
            </div>
            <span className="font-semibold text-lg tracking-tight">ShopLink</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/seller/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <Button asChild className="rounded-full rounded-full bg-ink text-ink-foreground hover:bg-ink/90">
              <Link to="/seller/login">Start Selling</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              The future of commerce is here
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
              Sell anywhere, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                scale everywhere.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Create your beautifully fast online store in minutes. Share your unique link with customers across WhatsApp, Instagram, and Twitter to start making sales instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base rounded-full bg-ink text-ink-foreground hover:bg-ink/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-ink/20">
                <Link to="/seller/login">
                  Start Selling Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base rounded-full bg-transparent border-border/80 hover:bg-muted transition-all duration-300">
                <Link to="/neon-supply">View Demo Store</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background border-y border-border/60">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-8 rounded-[32px] bg-canvas border border-border/60 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Stores optimized for speed, ensuring your customers never leave due to a slow page load.
                </p>
              </div>
              
              <div className="p-8 rounded-[32px] bg-canvas border border-border/60 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                  <Globe className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">One Link, All Socials</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Get a unified store link to share on WhatsApp, Instagram, or anywhere your audience is.
                </p>
              </div>

              <div className="p-8 rounded-[32px] bg-canvas border border-border/60 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <div className="h-14 w-14 rounded-2xl bg-warning/20 text-warning-foreground flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Checkout</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Bank-grade security built-in. Accept payments safely from customers anywhere in the world.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/60">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-ink text-ink-foreground flex items-center justify-center text-[10px] font-bold">
              S
            </div>
            <span className="font-semibold text-foreground">ShopLink</span>
          </div>
          <p>© 2026 ShopLink Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
