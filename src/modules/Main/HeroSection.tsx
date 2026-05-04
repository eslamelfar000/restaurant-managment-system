import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
  const { t } = useTranslation("landing");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 50);
      mouseY.set((clientY / innerHeight - 0.5) * 50);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" ref={containerRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-screen flex items-center">
      {/* Localized Floating Blobs for Hero */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          style={{ y: y2, x: springX }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-primary/20 blur-[120px] rounded-full dark:bg-primary/30"
        />
        <motion.div
          style={{ y: y3, x: useTransform(springX, (v) => -v) }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[5%] w-[45rem] h-[45rem] bg-blue-500/10 blur-[120px] rounded-full dark:bg-blue-500/20"
        />
        <motion.div
          style={{ y: useTransform(springY, (v) => v * 1.5), x: useTransform(springX, (v) => v * 1.5) }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] left-[20%] w-[30rem] h-[30rem] bg-rose-500/5 blur-[100px] rounded-full dark:bg-rose-500/10"
        />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-primary/20 text-primary mb-12 backdrop-blur-xl shadow-2xl shadow-primary/10"
          >
            <div className="flex -space-x-2 mr-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center overflow-hidden">
                   <Star size={10} className="fill-primary" />
                </div>
              ))}
            </div>
            <span className="text-sm font-semibold tracking-tight">{t("hero.badge")}</span>
          </motion.div>

          <motion.h1 
            style={{ y: y1, opacity }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl lg:text-[10rem] font-bold tracking-tighter mb-12 leading-[0.95] uppercase italic text-foreground"
          >
            {t("hero.title_top")} <br />
            <span className="bg-gradient-to-r from-primary via-orange-400 to-rose-500 bg-clip-text text-transparent">
              {t("hero.title_bottom")}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl lg:text-3xl text-muted-foreground mb-16 max-w-3xl mx-auto font-medium leading-tight"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mb-24"
          >
            {/* <Button size="xl" className="text-xl px-12 h-20 rounded-[2.5rem] font-bold italic group shadow-[0_20px_50px_rgba(255,121,102,0.3)] hover:scale-105 transition-all">
              {t("hero.cta_join")}
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button> */}
            
            {/* Animated Scroll Down Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-4 cursor-pointer group px-6"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="w-7 h-12 rounded-full border-2 border-zinc-900/10 dark:border-white/20 p-1 flex justify-center">
                <motion.div 
                  animate={{ 
                    y: [0, 18, 0],
                    opacity: [1, 0, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-1 h-1 rounded-full bg-primary"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-zinc-500 group-hover:text-primary transition-colors">{t("hero.cta_scroll_top")}</span>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-zinc-400 group-hover:text-primary transition-colors opacity-50">{t("hero.cta_scroll_bottom")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image/Card Preview */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative px-2 md:px-4"
          >
            <div className="relative mx-auto max-w-7xl rounded-[2rem] md:rounded-[3rem] border border-zinc-900/10 dark:border-white/20 bg-zinc-900/5 dark:bg-white/5 backdrop-blur-[50px] p-2 md:p-6 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="aspect-[16/10] md:aspect-[16/8] bg-zinc-900 dark:bg-zinc-950 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 dark:from-zinc-950 via-zinc-900/20 dark:via-zinc-950/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-left max-w-[70%] md:max-w-none">
                  <div className="h-0.5 md:h-1 w-12 md:w-24 bg-primary rounded-full mb-3 md:mb-6" />
                  <h3 className="text-xl md:text-4xl font-bold text-white mb-1 md:mb-2 italic tracking-tighter">{t("hero.preview_title")}</h3>
                  <p className="text-zinc-400 text-xs md:text-lg font-medium">{t("hero.preview_subtitle")}</p>
                </div>

                {/* Simulated Glass UI Components */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-4 right-4 md:top-12 md:right-12 w-32 md:w-80 h-20 md:h-48 bg-white/10 backdrop-blur-3xl rounded-xl md:rounded-3xl border border-white/20 p-3 md:p-8 shadow-2xl hidden sm:block"
                >
                  <div className="flex justify-between items-center mb-3 md:mb-8">
                    <div className="h-1 md:h-3 w-12 md:w-32 bg-white/20 rounded-full" />
                    <div className="h-4 w-4 md:h-8 md:w-8 rounded-full bg-primary/40" />
                  </div>
                  <div className="space-y-2 md:space-y-4">
                    <div className="h-4 md:h-10 w-full bg-white/5 rounded-lg md:rounded-2xl" />
                    <div className="h-4 md:h-10 w-2/3 bg-white/5 rounded-lg md:rounded-2xl" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
