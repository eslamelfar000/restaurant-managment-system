import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Mail, 
  Lock, 
  ArrowRight, 
  Globe,
  UtensilsCrossed,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const RestaurantLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back to your kitchen!");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-zinc-950 font-['Work_Sans']" dir={isRTL ? "rtl" : "ltr"}>
      {/* Left Section: Branding & Visuals */}
      <div className="hidden md:flex md:w-1/2 bg-zinc-900 relative overflow-hidden items-center justify-center p-12">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full animate-pulse" />
        </div>
        
        <div className="relative z-10 space-y-8 max-w-lg text-center md:text-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 justify-center md:justify-start"
          >
            <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40">
              <UtensilsCrossed className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tighter">Restaurant<span className="text-primary">OS</span></h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-5xl font-semibold text-white leading-tight tracking-tighter">
              Precision Management for <span className="text-primary underline decoration-primary/30 underline-offset-8">Modern Kitchens.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Experience the next generation of restaurant orchestration. Scalable, intuitive, and designed for growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-8 grid grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Uptime</p>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">2.4k+</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Live Outlets</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
           <Button variant="ghost" className="rounded-xl text-zinc-500 hover:text-primary transition-colors">
              Help Center
           </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-3 text-center md:text-start">
            <h3 className="text-4xl font-semibold tracking-tighter dark:text-white">Partner Login</h3>
            <p className="text-zinc-500 font-medium tracking-tight">Access your restaurant management console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Tenant/Domain Section */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">Restaurant Workspace</Label>
              <div className="relative group">
                <Input 
                  placeholder="my-restaurant" 
                  className="h-14 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 pl-12 pr-32 transition-all focus:ring-primary/20 text-lg font-medium"
                />
                <Building2 className="absolute left-4 top-4 text-zinc-400 group-focus-within:text-primary transition-colors" size={20} />
                <div className="absolute right-4 top-4 px-3 py-1 bg-zinc-200 dark:bg-white/10 rounded-lg text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">
                  .restaurant.os
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">Account Identifier</Label>
              <div className="relative group">
                <Input 
                  type="text"
                  placeholder="Email or phone number" 
                  className="h-14 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 pl-12 transition-all focus:ring-primary/20 text-lg"
                />
                <Mail className="absolute left-4 top-4 text-zinc-400 group-focus-within:text-primary transition-colors" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Security Key</Label>
                <button type="button" className="text-xs text-primary font-bold hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <Input 
                  type="password"
                  placeholder="••••••••" 
                  className="h-14 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 pl-12 transition-all focus:ring-primary/20 text-lg"
                />
                <Lock className="absolute left-4 top-4 text-zinc-400 group-focus-within:text-primary transition-colors" size={20} />
              </div>
            </div>

            <Button 
              disabled={isLoading}
              className="w-full h-14 rounded-2xl text-lg font-semibold shadow-2xl shadow-primary/20 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Validating Credentials..." : "Authenticate Access"}
                {!isLoading && <ChevronRight size={20} className={isRTL ? "rotate-180" : ""} />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </form>

          <div className="pt-8 text-center border-t border-zinc-100 dark:border-white/5">
            <p className="text-sm text-zinc-500">
              Not a partner yet? <button className="text-primary font-bold hover:underline">Provision Workspace</button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantLoginPage;
