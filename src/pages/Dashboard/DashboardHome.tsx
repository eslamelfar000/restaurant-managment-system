import { 
  TrendingUp, 
  Users, 
  Utensils, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  ChevronRight,
  Plus,
  Star,
  Activity,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition, MotionItem } from "@/components/shared/layout/PageTransition";
import { Badge } from "@/components/ui/badge";

const DashboardHome = () => {
  return (
    <PageTransition className="space-y-10 pb-10">
      {/* Welcome Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-medium text-sm">
            <Flame size={16} />
            <span>Kitchen is Heating Up!</span>
          </div>
          <h1 className="text-4xl md:text-6xl tracking-tight dark:text-white leading-tight">
            Good morning, <span className="text-primary font-medium">Chef Mario!</span>
          </h1>
          <p className="text-zinc-500 max-w-lg">Your restaurant is buzzing with energy. 12 reservations confirmed for this evening's service.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
         {[
           { label: "Daily Revenue", value: "$4,280.50", trend: "+12.5%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
           { label: "New Customers", value: "84", trend: "+8.2%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
           { label: "Orders Fulfilled", value: "156", trend: "-2.4%", icon: Utensils, color: "text-primary", bg: "bg-primary/10" },
           { label: "Table Bookings", value: "22", trend: "+15%", icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" }
         ].map((stat, i) => (
           <MotionItem key={stat.label} className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all group relative overflow-hidden">
              <div className="absolute -right-4 -top-4 h-24 w-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex items-center justify-between mb-8">
                 <div className={`h-14 w-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon size={28} />
                 </div>
                 <div className={`flex items-center gap-1.5 text-xs ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'} bg-zinc-50 dark:bg-white/5 px-3 py-1.5 rounded-full border border-zinc-100 dark:border-white/5`}>
                    {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span className="font-medium">{stat.trend}</span>
                 </div>
              </div>
              <div className="space-y-1 relative z-10">
                 <p className="text-xs text-zinc-400 tracking-wide">{stat.label}</p>
                 <p className="text-4xl tracking-tighter dark:text-white">{stat.value}</p>
              </div>
           </MotionItem>
         ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Side: Live Orders */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
               <div className="space-y-1">
                 <h3 className="text-2xl dark:text-white flex items-center gap-3">
                    <Activity className="text-primary animate-pulse" size={24} />
                    Live Orders
                 </h3>
                 <p className="text-xs text-zinc-500">Real-time status of your kitchen's current workload.</p>
               </div>
               <Button variant="outline" className="rounded-2xl gap-2 hover:bg-zinc-50 dark:hover:bg-white/5 border-zinc-200 dark:border-white/10">
                  <span>Display System</span>
                  <ChevronRight size={16} />
               </Button>
            </div>
            
            <div className="grid gap-4">
               {[
                 { id: "#ORD-8821", dish: "Truffle Mushroom Risotto", table: "T-102", status: "Preparing", time: "12 mins ago" },
                 { id: "#ORD-8822", dish: "Wagyu Beef Burger", table: "T-105", status: "In Queue", time: "5 mins ago" },
                 { id: "#ORD-8823", dish: "Classic Caesar Salad", table: "T-101", status: "Ready", time: "Just now" }
               ].map((order) => (
                 <MotionItem key={order.id} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 flex items-center justify-between group hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer">
                    <div className="flex items-center gap-5">
                       <div className="h-14 w-14 rounded-2xl bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-xs text-zinc-400 border border-zinc-100 dark:border-white/5 font-medium">
                          {order.id}
                       </div>
                       <div className="space-y-1">
                          <p className="text-lg dark:text-white group-hover:text-primary transition-colors">{order.dish}</p>
                          <div className="flex items-center gap-3 text-xs text-zinc-500">
                             <span className="flex items-center gap-1"><Users size={12} /> Table {order.table}</span>
                             <span className="h-1 w-1 rounded-full bg-zinc-300" />
                             <span className="flex items-center gap-1"><Clock size={12} /> {order.time}</span>
                          </div>
                       </div>
                    </div>
                    <Badge className={cn(
                      "rounded-xl px-4 py-2 border-none shadow-sm",
                      order.status === "Ready" ? "bg-emerald-500/10 text-emerald-500" :
                      order.status === "Preparing" ? "bg-primary/10 text-primary" : "bg-zinc-100 dark:bg-white/5 text-zinc-500"
                    )}>
                       {order.status}
                    </Badge>
                 </MotionItem>
               ))}
            </div>
         </div>

         {/* Right Side: Performance Card */}
         <div className="space-y-6">
            <div className="px-2">
               <h3 className="text-2xl dark:text-white flex items-center gap-3">
                  <Star className="text-amber-500 fill-amber-500" size={24} />
                  Top Sellers
               </h3>
               <p className="text-xs text-zinc-500">Most popular dishes this week.</p>
            </div>
            
            <div className="p-8 rounded-[3rem] bg-zinc-900 dark:bg-primary/5 border border-white/5 shadow-2xl relative overflow-hidden group">
               {/* Decorative Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50 pointer-events-none" />
               
               <div className="absolute -bottom-10 -right-10 p-8 opacity-5 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700">
                  <Utensils size={200} />
               </div>
               
               <div className="space-y-8 relative z-10">
                  {[
                    { name: "Crispy Duck", orders: 124, progress: 85 },
                    { name: "Pesto Pasta", orders: 98, progress: 65 },
                    { name: "Beef Tartare", orders: 76, progress: 45 }
                  ].map((item, i) => (
                    <div key={item.name} className="space-y-3">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <span className="text-[10px] text-primary/50 font-medium">0{i+1}</span>
                             <span className="text-white tracking-tight">{item.name}</span>
                          </div>
                          <span className="text-xs text-zinc-400">{item.orders} orders</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary-foreground/50 rounded-full transition-all duration-1000 ease-out group-hover:opacity-100 opacity-70"
                            style={{ width: `${item.progress}%` }}
                          />
                       </div>
                    </div>
                  ))}
               </div>
               
               <Button className="w-full mt-10 h-14 rounded-2xl bg-white text-black hover:bg-zinc-100 gap-3 group/btn">
                  <span>Full Analytics</span>
                  <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
               </Button>
            </div>

            {/* Sub Card: Quick Insight */}
            <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <TrendingUp size={24} />
               </div>
               <div>
                  <p className="text-xs text-zinc-500">Customer Satisfaction</p>
                  <div className="flex items-center gap-2">
                     <span className="text-xl dark:text-white tracking-tighter">4.9/5.0</span>
                     <span className="text-[10px] text-emerald-500 font-medium">+0.2 this week</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </PageTransition>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export default DashboardHome;
