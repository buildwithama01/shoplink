import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Store, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Smartphone, 
  CreditCard, 
  ShoppingBag,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4 | 5;

export default function SellerOnboarding() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    storeName: "",
    category: "",
    description: "",
    whatsapp: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 5) setStep((s) => (s + 1) as Step);
    else {
      localStorage.setItem("onboarding_complete", "true");
      navigate("/seller");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-4">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="w-full max-w-xl">
        <div className="relative">
          {step === 1 && (
            <div
              className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-[24px] flex items-center justify-center mx-auto mb-8">
                <Store className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to ShopLink</h1>
              <p className="text-muted-foreground text-lg mb-10">
                Let's get your store set up in just a few minutes. 
                We'll collect some basic info to create your professional storefront.
              </p>
              <Button size="lg" onClick={handleNext} className="h-14 px-10 text-lg rounded-2xl gap-2">
                Get started
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div
              className="shell p-8 md:p-10 animate-in fade-in slide-in-from-right-4 duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Store Details</h2>
                  <p className="text-sm text-muted-foreground">Give your store a name and identity</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="text-xs text-muted-foreground">Store Name</Label>
                  <Input 
                    placeholder="e.g. Cruz Gadgets" 
                    className="mt-1.5 h-12 rounded-xl"
                    value={formData.storeName}
                    onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Store Category</Label>
                  <Select 
                    onValueChange={(v) => setFormData({...formData, category: v})}
                    value={formData.category}
                  >
                    <SelectTrigger className="mt-1.5 h-12 rounded-xl">
                      <SelectValue placeholder="What do you sell?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics & Gadgets</SelectItem>
                      <SelectItem value="fashion">Fashion & Clothing</SelectItem>
                      <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                      <SelectItem value="food">Food & Groceries</SelectItem>
                      <SelectItem value="home">Home & Decor</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Brief Description</Label>
                  <Textarea 
                    placeholder="Tell your customers what you're all about..." 
                    className="mt-1.5 rounded-xl min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-10">
                <Button variant="ghost" onClick={handleBack} className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!formData.storeName || !formData.category} className="h-12 px-8 rounded-xl gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div
              className="shell p-8 md:p-10 animate-in fade-in slide-in-from-right-4 duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Contact Info</h2>
                  <p className="text-sm text-muted-foreground">How customers will reach you</p>
                </div>
              </div>

              <div className="space-y-6 text-center py-4">
                <div className="p-6 bg-muted/40 rounded-2xl border border-dashed border-border mb-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Your customers will send orders directly to your WhatsApp. 
                    Please provide your primary business number.
                  </p>
                  <div className="flex items-center max-w-xs mx-auto">
                    <div className="h-12 px-4 bg-background border border-r-0 rounded-l-xl flex items-center text-sm font-medium whitespace-nowrap shrink-0 select-none">
                      🇳🇬 +234
                    </div>
                    <Input 
                      placeholder="801 234 5678" 
                      className="h-12 rounded-l-none rounded-r-xl"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-10">
                <Button variant="ghost" onClick={handleBack} className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!formData.whatsapp} className="h-12 px-8 rounded-xl gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div
              className="shell p-8 md:p-10 animate-in fade-in slide-in-from-right-4 duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Payment Details</h2>
                  <p className="text-sm text-muted-foreground">For direct bank transfers</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="text-xs text-muted-foreground">Bank Name</Label>
                  <Input 
                    placeholder="e.g. Access Bank" 
                    className="mt-1.5 h-12 rounded-xl"
                    value={formData.bankName}
                    onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Account Name</Label>
                  <Input 
                    placeholder="The name on your bank account" 
                    className="mt-1.5 h-12 rounded-xl"
                    value={formData.accountName}
                    onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Account Number</Label>
                  <Input 
                    placeholder="10-digit number" 
                    maxLength={10}
                    className="mt-1.5 h-12 rounded-xl"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-10">
                <Button variant="ghost" onClick={handleBack} className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!formData.bankName || !formData.accountNumber} className="h-12 px-8 rounded-xl gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div
              className="text-center animate-in zoom-in-95 fade-in duration-500"
            >
              <div className="w-24 h-24 bg-success-soft text-success rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-success/10">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">You're all set!</h1>
              <p className="text-muted-foreground text-lg mb-10 max-w-sm mx-auto">
                Your store is ready to go. You can now add your first product and start selling.
              </p>
              
              <div className="grid gap-3 max-w-xs mx-auto">
                <Button size="lg" onClick={handleNext} className="h-14 rounded-2xl gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                step === s ? "w-8 bg-primary" : "w-1.5 bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
