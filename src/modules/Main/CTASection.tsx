import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CTASection = () => {
  const { t } = useTranslation("landing");

  return (
    <section className="py-40 relative overflow-hidden bg-background">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[4rem] bg-gradient-to-br from-primary/20 via-zinc-900/5 dark:via-zinc-900 to-zinc-100 dark:to-zinc-950 border border-zinc-900/10 dark:border-white/10 p-16 lg:p-32 text-center overflow-hidden shadow-2xl"
        >
          {/* Decorative background */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[40rem] h-[40rem] bg-primary/30 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-blue-500/20 blur-[150px] rounded-full" />
          
          <div className="relative z-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 text-foreground dark:text-white mb-12 backdrop-blur-md"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold tracking-[0.2em]">{t("cta.badge")}</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-6xl lg:text-[7rem] font-bold text-foreground dark:text-white mb-12 leading-[0.9] tracking-tighter italic"
            >
              {t("cta.title_top")} <br />
              <span className="text-primary">{t("cta.title_bottom")}</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-muted-foreground dark:text-zinc-400 mb-20 max-w-3xl mx-auto font-medium"
            >
              {t("cta.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-10"
            >
              <Button size="xl" className="bg-primary hover:bg-primary/90 text-white px-16 h-24 rounded-[2.5rem] text-2xl font-bold italic shadow-[0_25px_60px_-15px_rgba(255,121,102,0.5)] group transition-all hover:scale-105">
                {t("cta.button_primary")}
                <ArrowUpRight className="ml-3 w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
              <Button size="xl" variant="outline" className="border-zinc-900/20 dark:border-white/20 text-foreground dark:text-white hover:bg-zinc-900/5 dark:hover:bg-white/5 px-16 h-24 rounded-[2.5rem] text-2xl font-bold italic backdrop-blur-xl">
                {t("cta.button_secondary")}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
