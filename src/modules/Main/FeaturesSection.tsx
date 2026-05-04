import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Utensils, 
  Globe, 
  ShieldCheck, 
  Zap,
  ChevronRight
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const FeaturesSection = () => {
  const { t } = useTranslation("landing");

  const features = [
    {
      title: t("features.items.ai_menu.title"),
      description: t("features.items.ai_menu.description"),
      icon: Utensils,
      color: "bg-orange-500/10 text-orange-500",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      title: t("features.items.global.title"),
      description: t("features.items.global.description"),
      icon: Globe,
      color: "bg-blue-500/10 text-blue-500",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: t("features.items.sync.title"),
      description: t("features.items.sync.description"),
      icon: Zap,
      color: "bg-yellow-500/10 text-yellow-500",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: t("features.items.staffing.title"),
      description: t("features.items.staffing.description"),
      icon: Users,
      color: "bg-purple-500/10 text-purple-500",
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: t("features.items.enterprise.title"),
      description: t("features.items.enterprise.description"),
      icon: ShieldCheck,
      color: "bg-red-500/10 text-red-500",
      className: "md:col-span-2 md:row-span-1",
    },
  ];

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-semibold mb-4"
            >
              {t("features.badge")}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl lg:text-7xl font-bold mb-0 leading-tight text-foreground"
            >
              {t("features.title_top")} <br />
              <span className="text-zinc-500">{t("features.title_bottom")}</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-sm mb-2"
          >
            {t("features.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.01, duration: 0.008 }}
              whileHover={{ y: -10 }}
              className={`group p-10 rounded-3xl bg-zinc-900/5 dark:bg-white/5 backdrop-blur-2xl border border-zinc-900/10 dark:border-white/10 hover:border-primary/40 transition-all duration-700 flex flex-col justify-between overflow-hidden relative shadow-2xl shadow-transparent hover:shadow-primary/10 ${feature.className}`}
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 group-hover:rotate-[-12deg] group-hover:scale-110">
                <feature.icon className="w-48 h-48" />
              </div>
              
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 shadow-lg shadow-current/10`}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-3xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-lg max-w-md group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-all translate-x-[-15px] group-hover:translate-x-0 duration-500">
                <span className="text-sm tracking-wide">{t("features.learn_more")}</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <ChevronRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
