import { motion } from "framer-motion";
import { Check, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const PricingSection = () => {
  const { t } = useTranslation("landing");
  const navigate = useNavigate();

  const bundles = [
    {
      id: "starter",
      name: t("pricing.bundles.starter.name", "Starter"),
      price: "$49",
      description: t("pricing.bundles.starter.description", "Perfect for boutiques and small cafes."),
      features: [
        "Up to 50 items",
        "Digital Menu",
        "Basic Analytics",
        "1 Location"
      ],
      highlight: false,
    },
    {
      id: "pro",
      name: t("pricing.bundles.pro.name", "Professional"),
      price: "$99",
      description: t("pricing.bundles.pro.description", "Advanced tools for high-volume bistros."),
      features: [
        "Unlimited items",
        "Order Management",
        "Staff Accounts",
        "Advanced Analytics",
        "Up to 3 Locations"
      ],
      highlight: true,
    },
    {
      id: "enterprise",
      name: t("pricing.bundles.enterprise.name", "Enterprise"),
      price: t("pricing.custom"),
      description: t("pricing.bundles.enterprise.description", "Global solutions for major franchises."),
      features: [
        "Custom Integrations",
        "Dedicated Manager",
        "White-label Option",
        "API Access",
        "Unlimited Locations"
      ],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-background">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 text-primary mb-8"
          >
            <Zap size={16} className="fill-primary" />
            <span className="text-sm font-semibold tracking-widest">{t("pricing.badge")}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // transition={{ delay: 0.1 }}
            className="text-6xl lg:text-8xl font-bold text-foreground mb-8 leading-none"
          >
            {t("pricing.title_top")} <br />
            <span className="text-zinc-500">{t("pricing.title_bottom")}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // transition={{ delay: 0.2 }}
            className="text-2xl text-muted-foreground font-medium"
          >
            {t("pricing.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.001, duration: 0.01, ease: [0.016, 0.01, 0.03, 0.01] }}
              whileHover={{ y: -15 }}
              className={`relative p-12 rounded-[4rem] border transition-all duration-700 flex flex-col group ${
                bundle.highlight 
                  ? "bg-primary text-white border-primary scale-105 shadow-[0_40px_100px_-20px_rgba(255,121,102,0.5)] z-20" 
                  : "bg-zinc-900/5 dark:bg-white/5 backdrop-blur-3xl border-zinc-900/10 dark:border-white/10 text-foreground hover:border-primary/30 shadow-xl shadow-transparent hover:shadow-primary/5"
              }`}
            >
              {bundle.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 text-white px-8 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] border border-white/10 shadow-2xl">
                  {t("pricing.highlight")}
                </div>
              )}

              {/* Decorative Background for Pro */}
              {bundle.highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 rounded-[4rem]" />
              )}
              
              <div className="mb-14 relative z-10">
                <h3 className="text-4xl font-bold mb-4 italic tracking-tighter group-hover:translate-x-2 transition-transform duration-500">{bundle.name}</h3>
                <p className={`text-lg font-medium leading-relaxed ${bundle.highlight ? "text-white/80" : "text-muted-foreground"}`}>
                  {bundle.description}
                </p>
              </div>

              <div className="mb-14 relative z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold tracking-tighter leading-none">{bundle.price}</span>
                  {bundle.price !== t("pricing.custom") && (
                    <span className={`text-xl font-semibold opacity-60`}>
                      /{t("pricing.mo")}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-6 mb-16 flex-grow relative z-10">
                {bundle.features.map((feature, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 ${
                      bundle.highlight ? "bg-white/20" : "bg-primary/20"
                    }`}>
                      <Check className={`w-4 h-4 ${bundle.highlight ? "text-white" : "text-primary"}`} />
                    </div>
                    <span className="text-lg font-semibold group-hover/item:translate-x-1 transition-transform">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Button 
                onClick={() => navigate(`/subscribe-bundle/${bundle.id}`)}
                size="xl"
                variant={bundle.highlight ? "secondary" : "outline"}
                className={`w-full h-24 rounded-[2.5rem] text-2xl font-bold italic group/btn relative z-10 overflow-hidden ${
                  bundle.highlight 
                    ? "bg-white text-primary hover:bg-zinc-100 shadow-2xl shadow-white/20" 
                    : "border-zinc-900/10 dark:border-white/10 text-foreground dark:text-white hover:bg-primary hover:text-white hover:border-primary"
                }`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t("pricing.button")}
                  <ArrowRight className="w-7 h-7 rtl:rotate-180 group-hover/btn:translate-x-2 transition-transform" />
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
