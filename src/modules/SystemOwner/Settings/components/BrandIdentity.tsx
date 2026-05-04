import { ImageIcon, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const BrandIdentity = () => {
  return (
    <Card className="border-zinc-200 dark:border-white/5 bg-white dark:bg-white/[0.02] rounded-3xl overflow-hidden shadow-sm">
      <CardHeader className="p-8">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 leading-none">
          <ImageIcon className="text-primary" size={20} />
          Brand Identity
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8 space-y-6">
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 dark:border-white/10 rounded-3xl bg-zinc-50 dark:bg-white/5 group hover:border-primary/50 transition-colors cursor-pointer">
          <div className="h-24 w-24 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-primary">R<span className="text-zinc-400">OS</span></span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            <Upload size={14} className="mr-2" />
            Replace Logo
          </Button>
          <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-widest font-medium">SVG, PNG or WEBP (max. 1MB)</p>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium px-1">System Name</label>
          <Input defaultValue="RestaurantOS Enterprise" className="h-12 rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 focus:ring-primary/20" />
        </div>
      </CardContent>
    </Card>
  );
};
