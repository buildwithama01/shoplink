"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const steps = ["Store Info", "Appearance", "Ready"];

export default function SellerOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [storeName, setStoreName] = useState("");
  const slug = storeName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div className="min-h-screen bg-canvas grid lg:grid-cols-2">
      {/* Left */}
      <div className="hidden lg:flex p-5">
        <div className="flex-1 rounded-[28px] bg-ink text-ink-foreground p-12 flex flex-col justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-background text-foreground flex items-center justify-center text-sm font-bold">S</div>
            <span className="font-semibold tracking-tight">ShopLink</span>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] font-medium text-ink-foreground/60">Step {step + 1} of {steps.length}</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight leading-tight max-w-md">
              {step === 0 && "Tell us about your store."}
              {step === 1 && "Make it yours."}
              {step === 2 && "You're all set!"}
            </h2>
          </div>
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? "w-6 bg-background" : "w-1.5 bg-background/30"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center p-5">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="h-8 w-8 rounded-xl bg-ink text-ink-foreground flex items-center justify-center text-sm font-bold">S</div>
            <span className="font-semibold tracking-tight">ShopLink</span>
          </div>

          <div className="flex items-center gap-2 mb-6 lg:hidden">
            {steps.map((s, i) => (
              <div key={i} className={`flex-1 h-1 rounded-full ${i <= step ? "bg-ink" : "bg-border"}`} />
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Store details</h1>
                <p className="text-sm text-muted-foreground mt-1">We just need a few things to get started.</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Store name</Label>
                <Input className="mt-1.5 rounded-xl" placeholder="e.g. Cruz Gadgets" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                {slug && <div className="text-xs text-muted-foreground mt-1.5">shoplink.app/<span className="font-medium text-foreground">{slug}</span></div>}
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Category</Label>
                <Select>
                  <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select a category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion & Clothing</SelectItem>
                    <SelectItem value="food">Food & Beverages</SelectItem>
                    <SelectItem value="beauty">Beauty & Skincare</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">WhatsApp number</Label>
                <Input className="mt-1.5 rounded-xl" placeholder="+234 801 234 5678" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Customize</h1>
                <p className="text-sm text-muted-foreground mt-1">Upload a logo and pick a color.</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Logo</Label>
                <div className="mt-1.5 border-2 border-dashed border-border rounded-2xl p-8 text-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-background border border-border mx-auto flex items-center justify-center">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="mt-3 font-medium text-sm">Upload logo</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Primary color</Label>
                <div className="mt-1.5 flex gap-3">
                  {["#16a34a", "#2563eb", "#9333ea", "#e11d48", "#f97316", "#0d0d0d"].map((c) => (
                    <button key={c} className="h-10 w-10 rounded-xl border-2 border-transparent hover:border-foreground/30 transition-all" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 text-center">
              <div className="h-16 w-16 rounded-2xl bg-tile-mint flex items-center justify-center mx-auto">
                <ImageIcon className="h-8 w-8 text-foreground/30" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">Your store is ready!</h1>
              <p className="text-sm text-muted-foreground">Start adding products and share your link with the world.</p>
              <Button className="w-full" size="lg" onClick={() => router.push("/seller/dashboard")}>
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step < 2 && (
            <div className="flex items-center gap-3 mt-8">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              )}
              <Button className="flex-1 gap-2" onClick={() => setStep(step + 1)}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already have a store?{" "}
            <Link href="/seller/login" className="underline hover:text-foreground">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
