import { useState } from "react";
import { StoreNavbar } from "@/components/shop/StoreNavbar";
import { OrderSummaryCard } from "@/components/shop/OrderSummaryCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Copy, Check, Building2 } from "lucide-react";
import { toast } from "sonner";

// Mock bank details (would come from store settings in production)
const bankDetails = {
  bankName: "Access Bank",
  accountName: "Cruz Gadgets Ltd",
  accountNumber: "0123456789",
};

function Section({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] bg-background border border-border/60 p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="h-7 w-7 rounded-full bg-ink text-ink-foreground text-xs font-semibold flex items-center justify-center shrink-0">
          {step}
        </span>
        <h2 className="font-semibold text-base">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function BankTransferDetails() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyField = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopiedField(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="mt-5 rounded-2xl bg-muted/50 border border-border/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border/60 bg-muted/30">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">Bank Transfer Details</span>
      </div>

      <div className="divide-y divide-border/60">
        {[
          { label: "Bank Name", value: bankDetails.bankName },
          { label: "Account Name", value: bankDetails.accountName },
          { label: "Account Number", value: bankDetails.accountNumber },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-3.5 gap-3">
            <div>
              <div className="text-xs text-muted-foreground">{row.label}</div>
              <div className="font-semibold text-sm mt-0.5 font-mono tracking-wide">{row.value}</div>
            </div>
            <button
              onClick={() => copyField(row.label, row.value)}
              className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center transition-all shrink-0",
                copiedField === row.label
                  ? "bg-green-100 text-green-600"
                  : "bg-background border border-border hover:bg-muted text-muted-foreground"
              )}
            >
              {copiedField === row.label ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="px-5 py-3.5 bg-amber-50 border-t border-amber-100">
        <p className="text-xs text-amber-700">
          ⚠️ Transfer the exact order total and use your name as the payment reference. Your order will be confirmed once payment is verified.
        </p>
      </div>
    </div>
  );
}

export default function Checkout() {
  const [shipping, setShipping] = useState<"pickup" | "delivery">("delivery");
  const [payment, setPayment] = useState<"cod" | "transfer">("transfer");
  const fee = shipping === "delivery" ? 5000 : 0;
  const paymentStep = shipping === "delivery" ? 4 : 3;

  return (
    <div className="min-h-screen bg-canvas">
      <StoreNavbar />
      <div className="container py-8">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">Checkout</div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2">Almost there</h1>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 mt-7">
          <div className="space-y-5">
            {/* Step 1 — Contact */}
            <Section step={1} title="Contact details">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Full name</Label>
                  <Input className="mt-1.5 rounded-xl" placeholder="Adaeze Okafor" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <Input className="mt-1.5 rounded-xl" type="email" placeholder="you@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs text-muted-foreground">Phone</Label>
                  <div className="flex mt-1.5 h-10">
                    <span className="inline-flex items-center gap-1.5 h-full border border-r-0 border-input rounded-l-xl px-3 text-sm bg-muted/60 text-foreground whitespace-nowrap shrink-0 select-none">
                      🇳🇬 +234
                    </span>
                    <Input
                      className="rounded-l-none rounded-r-xl border-l-0 h-full focus-visible:ring-offset-0"
                      placeholder="801 234 5678"
                      type="tel"
                    />
                  </div>
                </div>
              </div>
            </Section>

            {/* Step 2 — Shipping */}
            <Section step={2} title="Shipping method">
              <RadioGroup
                value={shipping}
                onValueChange={(v: "pickup" | "delivery") => setShipping(v)}
                className="grid sm:grid-cols-2 gap-3"
              >
                {[
                  { v: "pickup", label: "Pickup", note: "Free", desc: "Collect from our Lagos store" },
                  { v: "delivery", label: "Delivery", note: "₦5,000", desc: "2-5 business days" },
                ].map((o) => (
                  <Label
                    key={o.v}
                    htmlFor={`ship-${o.v}`}
                    className={cn(
                      "flex items-start gap-3 border rounded-2xl p-4 cursor-pointer transition-all",
                      shipping === o.v ? "border-ink bg-muted/40" : "border-border hover:border-foreground/30"
                    )}
                  >
                    <RadioGroupItem id={`ship-${o.v}`} value={o.v} className="mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm">{o.label}</span>
                        <span className="text-xs font-semibold">{o.note}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{o.desc}</div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </Section>

            {/* Step 3 — Address (only for delivery) */}
            {shipping === "delivery" && (
              <Section step={3} title="Delivery address">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label className="text-xs text-muted-foreground">Address line 1</Label>
                    <Input className="mt-1.5 rounded-xl" placeholder="12 Allen Avenue" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">City</Label>
                    <Input className="mt-1.5 rounded-xl" placeholder="Ikeja" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">State</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5 rounded-xl">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="abuja">Abuja</SelectItem>
                        <SelectItem value="rivers">Rivers</SelectItem>
                        <SelectItem value="kano">Kano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Section>
            )}

            {/* Step 4/3 — Payment */}
            <Section step={paymentStep} title="Payment method">
              <RadioGroup
                value={payment}
                onValueChange={(v: "cod" | "transfer") => setPayment(v)}
                className="grid sm:grid-cols-2 gap-3"
              >
                {[
                  { v: "cod", label: "Cash on delivery", desc: "Pay when it arrives" },
                  { v: "transfer", label: "Bank transfer", desc: "Pay to our account" },
                ].map((o) => (
                  <Label
                    key={o.v}
                    htmlFor={`pay-${o.v}`}
                    className={cn(
                      "flex items-start gap-3 border rounded-2xl p-4 cursor-pointer transition-all",
                      payment === o.v ? "border-ink bg-muted/40" : "border-border hover:border-foreground/30"
                    )}
                  >
                    <RadioGroupItem id={`pay-${o.v}`} value={o.v} className="mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{o.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{o.desc}</div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>

              {/* Bank transfer details — shown inline when selected */}
              {payment === "transfer" && <BankTransferDetails />}
            </Section>
          </div>

          <div className="lg:col-span-1">
            <OrderSummaryCard shippingFee={fee} />
          </div>
        </div>
      </div>
    </div>
  );
}
