"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, MessageCircle, Package, Truck, Activity, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Pricing from "@/components/shadcn-space/radix/blocks/pricing-01/pricing";

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-canvas font-sans selection:bg-primary/20 scroll-smooth">
      {/* SECTION 1 — NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50 bg-canvas/80 backdrop-blur-xl border-b border-border/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-ink text-ink-foreground flex items-center justify-center text-sm font-bold shadow-sm">
              S
            </div>
            <span className="font-semibold text-lg tracking-tight">ShopLink</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/seller/login">Start Selling Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* SECTION 2 — HERO */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-24 px-6 text-center">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm font-medium mb-8 shadow-sm">
              🇳🇬 Built for Nigerian Sellers
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
              Your Business Deserves <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                a Real Online Store
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop sending price lists on WhatsApp. ShopLink gives you a professional storefront, linked directly to your WhatsApp — set up in minutes, not months.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button asChild size="lg" className="h-14 px-8 text-base rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/20">
                <Link href="/seller/login">
                  Create Your Free Store <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base rounded-full bg-background hover:bg-muted transition-all duration-300 border-border">
                <Link href="/cruz-gadgets">See a Live Store</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
              <span className="text-yellow-400 text-lg">⭐</span> Trusted by 500+ Nigerian sellers
            </div>
          </div>
        </section>

        {/* SECTION 3 — SOCIAL PROOF BAR */}
        <section className="py-16 bg-background border-y border-border/60">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground mb-10">Sellers across Nigeria are already winning</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl mb-2">🏪</div>
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm text-muted-foreground font-medium">Active Stores</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl mb-2">📦</div>
                <div className="text-3xl font-bold mb-1">12,000+</div>
                <div className="text-sm text-muted-foreground font-medium">Orders Processed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl mb-2">💰</div>
                <div className="text-3xl font-bold mb-1">₦180M+</div>
                <div className="text-sm text-muted-foreground font-medium">in Sales Generated</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl mb-2">⚡</div>
                <div className="text-3xl font-bold mb-1">5 Mins</div>
                <div className="text-sm text-muted-foreground font-medium">Average Setup Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — FEATURES */}
        <section id="features" className="py-24 px-6 bg-canvas">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-4 block">FEATURES</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to sell online</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">No tech skills needed. No expensive developer. Just you, your products, and your customers.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: ShoppingBag, title: "Your Own Storefront", desc: "Get a clean, professional store page with your brand name, logo, and colors. Share the link anywhere — Instagram, Twitter, WhatsApp." },
                { icon: MessageCircle, title: "WhatsApp Order Alerts", desc: "Every order goes straight to your WhatsApp. No missed sales, no checking dashboards — just a message with the full order details." },
                { icon: Package, title: "Easy Product Management", desc: "Add products, set prices, upload photos, and manage variants like color and size — all from one simple dashboard." },
                { icon: Truck, title: "Flexible Shipping Options", desc: "Offer pickup, fixed delivery fees, or free delivery above a certain order amount. You set the rules." },
                { icon: Activity, title: "Order Tracking for Customers", desc: "Give every customer a unique tracking link so they can follow their order — reducing 'where is my order?' messages." },
                { icon: CreditCard, title: "Multiple Payment Methods", desc: "Accept cash on delivery, bank transfer, or any payment method that works for your business." }
              ].map((feat, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-background border border-border/60 hover:shadow-xl transition-all duration-300 group">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-6 bg-background border-y border-border/60">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-4 block">HOW IT WORKS</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Your store, live in 3 steps</h2>
              <p className="text-lg text-muted-foreground">Seriously. Three steps.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
              {[
                { icon: "📝", title: "Create your account", desc: "Sign up free. Tell us your store name, what you sell, and your WhatsApp number. Takes less than 5 minutes." },
                { icon: "📸", title: "Add your products", desc: "Upload your product photos, set your prices, add variants. Your storefront updates instantly — no developer needed." },
                { icon: "🚀", title: "Share and start selling", desc: "Copy your store link and share it everywhere. When a customer orders, you get a WhatsApp message immediately." }
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full bg-canvas border-8 border-background flex items-center justify-center text-4xl mb-6 shadow-sm z-10">
                    {step.icon}
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — PRICING */}
        <Pricing />

        {/* SECTION 7 — TESTIMONIALS */}
        <section className="py-24 px-6 bg-background border-y border-border/60">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-4 block">TESTIMONIALS</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Sellers love ShopLink</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Amaka O.", role: "Fashion seller, Lagos", initial: "AO", quote: "I used to send price lists on WhatsApp manually. Now my customers just visit my store link and order themselves. My sales doubled in the first month." },
                { name: "Emeka D.", role: "Electronics dealer, Abuja", initial: "ED", quote: "Setup was so easy I thought something was wrong. Within 10 minutes my store was live and I got my first order the same day." },
                { name: "Fatima B.", role: "Skincare brand, Kano", initial: "FB", quote: "The WhatsApp alert is everything. I know immediately when someone orders. ShopLink is built for how we actually do business in Nigeria." }
              ].map((t, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-canvas border border-border/60 flex flex-col gap-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                  </div>
                  <p className="text-foreground/90 text-lg leading-relaxed flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg text-white ${i===0 ? 'bg-green-600' : i===1 ? 'bg-blue-600' : 'bg-purple-600'}`}>
                      {t.initial}
                    </div>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 — FAQ */}
        <section id="faq" className="py-24 px-6 bg-canvas">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-4 block">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Got questions? We have answers.</h2>
            </div>
            
            <div className="bg-background rounded-[32px] p-8 border border-border/60 shadow-sm">
              <Accordion type="single" collapsible className="w-full">
                {[
                  { q: "Do I need a website or coding skills?", a: "Not at all. ShopLink gives you everything. If you can use WhatsApp, you can use ShopLink." },
                  { q: "How do customers pay?", a: "You choose your payment methods — cash on delivery, bank transfer, or whatever works for your business. We don't handle payments directly." },
                  { q: "Can I use my own domain name?", a: "Yes, on the Boss plan you can connect your own custom domain (e.g. amakafashion.com)." },
                  { q: "What happens when I exceed my order limit?", a: "We'll notify you before you hit the limit so you can upgrade. We won't shut your store down without warning." },
                  { q: "Is my store live immediately after signup?", a: "Yes. The moment you complete onboarding and add your first product, your store is live and shareable." },
                  { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no hidden fees. Cancel or downgrade anytime from your dashboard." }
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b-border/60 last:border-0">
                    <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-colors py-6">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FINAL CTA */}
        <section className="py-32 px-6 bg-ink text-ink-foreground text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          <div className="container mx-auto max-w-3xl relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Ready to take your business online?</h2>
            <p className="text-xl text-ink-foreground/80 mb-10">Join hundreds of Nigerian sellers already using ShopLink to sell smarter.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button asChild size="lg" className="h-14 px-8 text-base rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl">
                <Link href="/seller/login">Create Your Free Store</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 transition-all duration-300">
                <Link href="#">Talk to us on WhatsApp</Link>
              </Button>
            </div>
            <p className="text-sm text-ink-foreground/60">No credit card required · Setup in 5 minutes · Cancel anytime</p>
          </div>
        </section>
      </main>

      {/* SECTION 10 — FOOTER */}
      <footer className="py-20 px-6 bg-background border-t border-border/60">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="h-8 w-8 rounded-xl bg-ink text-ink-foreground flex items-center justify-center text-sm font-bold shadow-sm">
                  S
                </div>
                <span className="font-semibold text-xl tracking-tight">ShopLink</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The online store for Nigerian sellers.
              </p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Link href="#" className="hover:text-foreground transition-colors"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></Link>
                <Link href="#" className="hover:text-foreground transition-colors"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></Link>
                <Link href="#" className="hover:text-foreground transition-colors"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">WhatsApp Support</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Report a Problem</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 ShopLink. All rights reserved. | Made with ❤️ in Nigeria</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
