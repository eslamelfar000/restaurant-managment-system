import { Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface OperationsControlProps {
  isMaintenance: boolean;
  setIsMaintenance: (val: boolean) => void;
}

export const OperationsControl = ({ isMaintenance, setIsMaintenance }: OperationsControlProps) => {
  return (
    <Card className="border-zinc-200 dark:border-white/5 bg-white dark:bg-white/[0.02] rounded-3xl overflow-hidden shadow-sm">
      <CardHeader className="p-8">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-orange-500 leading-none">
          <Lock size={20} />
          Operations
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8 space-y-6">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10">
          <div className="space-y-1">
            <p className="text-sm font-semibold dark:text-white leading-tight">Maintenance Mode</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Redirect all traffic to maintenance page</p>
          </div>
          <Switch 
            checked={isMaintenance} 
            onCheckedChange={setIsMaintenance} 
          />
        </div>
      </CardContent>
    </Card>
  );
};
