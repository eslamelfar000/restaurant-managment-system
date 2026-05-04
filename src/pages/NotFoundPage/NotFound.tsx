import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChefHat, ArrowLeft, Home, Search, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden font-['Work_Sans']">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-orange-500/5 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-2xl w-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Visual */}
          <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-150 animate-pulse" />
            <div className="relative bg-white dark:bg-zinc-900 h-32 w-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-zinc-100 dark:border-white/5 group overflow-hidden">
               <motion.div
                 animate={{ rotate: [0, -10, 10, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               >
                 <ChefHat size={64} className="text-primary group-hover:scale-110 transition-transform duration-500" />
               </motion.div>
               
               {/* Floating elements */}
               <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary animate-ping" />
               <UtensilsCrossed size={16} className="absolute bottom-4 left-4 text-zinc-300 dark:text-zinc-700 opacity-50" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-[12rem] font-black leading-none tracking-tighter text-zinc-100 dark:text-white/5 absolute left-1/2 -top-24 -translate-x-1/2 select-none">
                404
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white relative">
                Lost in the <span className="text-primary">Kitchen?</span>
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              We couldn't find the recipe for this page. It might have been moved or doesn't exist anymore.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button asChild size="lg" className="h-14 px-8 rounded-2xl text-base shadow-xl shadow-primary/20 gap-2 font-bold group">
                <Link to="/">
                  <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                  Return Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-base border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 gap-2 font-bold">
                <button onClick={() => window.history.back()}>
                  <ArrowLeft size={18} />
                  Go Back
                </button>
              </Button>
            </div>
          </div>

          {/* Quick Help Section */}
          <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-8">
             <div className="text-left space-y-2">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold">
                   <div className="h-6 w-6 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center">
                      <Search size={14} className="text-primary" />
                   </div>
                   Help Center
                </div>
                <p className="text-xs text-zinc-500 leading-normal">Find documentation and guides for using RestaurantOS.</p>
             </div>
             <div className="text-left space-y-2">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold">
                   <div className="h-6 w-6 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center">
                      <UtensilsCrossed size={14} className="text-primary" />
                   </div>
                   Menu Editor
                </div>
                <p className="text-xs text-zinc-500 leading-normal">Go directly to your restaurant's dish management.</p>
             </div>
             <div className="text-left space-y-2">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold">
                   <div className="h-6 w-6 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center">
                      <Search size={14} className="text-primary" />
                   </div>
                   Support Team
                </div>
                <p className="text-xs text-zinc-500 leading-normal">Need assistance? Our chefs are here to help you.</p>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30 select-none">
        <ChefHat size={16} />
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">RestaurantOS System</span>
      </div>
    </div>
  );
};

export default NotFound;
