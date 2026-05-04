import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  Mail,
  Calendar,
  ShieldCheck,
  Cpu,
  Server,
  CreditCard,
  Zap,
  Shield,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { OrgStats } from "@/modules/SystemOwner/Organizations/components/OrgStats";

const OrganizationDetails = () => {
  const { orgId } = useParams();
  const navigate = useNavigate();

  // Mock data for the specific organization
  const org = {
    id: orgId,
    name: "Gourmet Haven",
    domain: "gourmet.restaurantos.io",
    owner: "admin@gourmet.io",
    status: "active",
    plan: "Enterprise",
    createdAt: "2024-03-15",
    metrics: {
      totalUsers: "1,240",
      activeUsers: "850",
      storageUsed: "45.2 GB",
      uptime: "99.98%",
      cpuUsage: "12%",
      ramUsage: "4.2 GB",
    },
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-start gap-5">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-14 w-14 rounded-2xl border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all shadow-sm"
          >
            <ArrowLeft size={24} />
          </Button>
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-4xl md:text-5xl tracking-tighter dark:text-white leading-none font-semibold">
                {org.name}
              </h2>
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-500 border-none rounded-full px-5 py-1.5 text-xs font-semibold"
              >
                {org.status}
              </Badge>
            </div>
            <p className="text-zinc-500 text-sm md:text-base font-medium">
              Cluster ID:{" "}
              <span className="text-zinc-900 dark:text-zinc-300">
                {org.id}
              </span>{" "}
              • Provisioned on {org.createdAt}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <Button
            variant="outline"
            className="w-full sm:w-auto h-14 rounded-2xl px-6 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 font-semibold"
          >
            Export Audit Logs
          </Button>
          <Button className="w-full sm:w-auto h-14 rounded-2xl px-8 shadow-xl shadow-primary/20 gap-2 font-semibold">
            <Zap size={20} />
            Update Manifest
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-10">
          <OrgStats metrics={org.metrics} />

          <Card className="border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 md:p-10 border-b border-zinc-100 dark:border-white/5">
              <CardTitle className="text-2xl flex items-center gap-3 leading-none font-semibold">
                <Layers className="text-primary" size={24} />
                Instance Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <InfoRow
                    icon={Globe}
                    label="Primary Entrypoint"
                    value={org.domain}
                  />
                  <InfoRow
                    icon={Mail}
                    label="Administrative Owner"
                    value={org.owner}
                  />
                  <InfoRow
                    icon={Shield}
                    label="Security Protocol"
                    value="AES-256 + mTLS"
                  />
                </div>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 text-sm font-medium">
                        CPU Compute Load
                      </span>
                      <span className="text-primary text-sm font-bold">
                        {org.metrics.cpuUsage}
                      </span>
                    </div>
                    <div className="h-2.5 bg-zinc-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: org.metrics.cpuUsage }}
                        className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 text-sm font-medium">
                        Memory Allocation
                      </span>
                      <span className="text-blue-500 text-sm font-bold">
                        {org.metrics.ramUsage}
                      </span>
                    </div>
                    <div className="h-2.5 bg-zinc-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-10">
          <Card className="border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm rounded-[2.5rem] overflow-hidden group">
            <CardHeader className="p-8 bg-zinc-50 dark:bg-white/5 border-b border-zinc-100 dark:border-white/5">
              <CardTitle className="text-xl flex items-center gap-3 leading-none font-semibold">
                <CreditCard className="text-primary" size={20} />
                Billing Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-10 space-y-8">
              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden group/tier">
                <div className="absolute top-0 right-0 h-16 w-16 bg-primary/10 rounded-full blur-2xl -mr-8 -mt-8" />
                <p className="text-[10px] text-primary tracking-widest font-bold mb-1 uppercase">
                  Active Tier
                </p>
                <p className="text-3xl tracking-tighter text-primary leading-none font-bold">
                  {org.plan}
                </p>
              </div>
              <div className="space-y-5 px-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500 font-medium">
                    Monthly Cycle
                  </span>
                  <span className="dark:text-white font-bold">$1,299.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500 font-medium">
                    Next Renewal
                  </span>
                  <span className="dark:text-white font-bold">
                    April 15, 2024
                  </span>
                </div>
              </div>
              <Button
                className="w-full h-14 rounded-2xl font-semibold"
                variant="outline"
              >
                View Ledger
              </Button>
            </CardContent>
          </Card>

          <div className="p-10 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative z-10 space-y-1">
              <h3 className="text-white text-xl font-semibold">
                Quick Diagnostics
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                Infrastructure control commands.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <DiagnosticBtn icon={Cpu} label="Scale Up" />
              <DiagnosticBtn icon={Server} label="Sync Cluster" />
              <DiagnosticBtn icon={ShieldCheck} label="Audit" />
              <DiagnosticBtn icon={Calendar} label="Renew" />
            </div>
            <Button className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-100 gap-3 mt-4 font-bold">
              <span>Network Map</span>
              <ArrowUpRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-5 group">
    <div className="h-12 w-12 rounded-xl bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
      <Icon size={20} />
    </div>
    <div className="space-y-0.5">
      <p className="text-[10px] text-zinc-500 tracking-wider uppercase font-bold">
        {label}
      </p>
      <p className="text-base dark:text-white leading-none font-medium">
        {value}
      </p>
    </div>
  </div>
);

const DiagnosticBtn = ({ icon: Icon, label }: any) => (
  <button className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 gap-3 group">
    <Icon
      size={20}
      className="text-zinc-500 group-hover:text-primary transition-colors"
    />
    <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-widest font-medium">
      {label}
    </span>
  </button>
);

export default OrganizationDetails;
