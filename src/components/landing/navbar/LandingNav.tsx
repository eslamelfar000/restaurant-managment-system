import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UtensilsCrossed, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../../shared/ThemeToggle/ThemeToggle";
import { LanguageToggle } from "../../shared/LanguageToggle/LanguageToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export const LandingNav = () => {
  const { t } = useTranslation("landing");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.features"), href: "#features" },
    { name: t("nav.pricing"), href: "#pricing" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled ? "py-4" : "py-8",
        )}
      >
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
              "mx-auto max-w-7xl px-6 py-3 rounded-[2rem] border transition-all duration-500 flex items-center justify-between",
              isScrolled
                ? "bg-background/60 backdrop-blur-2xl border-zinc-900/10 dark:border-white/10 shadow-2xl"
                : "bg-transparent border-transparent",
            )}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                <UtensilsCrossed className="!size-4 sm:!size-5" />
              </div>
              <span className="text-md sm:text-2xl font-bold tracking-tighter italic text-foreground">
                RestOS
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold  text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3 pe-4 border-e border-zinc-900/10 dark:border-white/10">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-bold tracking-widest text-foreground hover:text-primary transition-colors italic"
                >
                  {t("nav.login")}
                </Link>
                <a href="#pricing">
                  <Button className="rounded-full px-8 font-bold italic group flex items-center gap-2">
                    {t("nav.get_started")}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="flex md:hidden">
              <div className="flex items-center gap-2">
                {/* <LanguageToggle /> */}
                <ThemeToggle />
              </div>
              {/* Mobile Toggle */}
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background lg:hidden p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="bg-primary p-2 rounded-xl text-white">
                  <UtensilsCrossed className="!size-4 sm:!size-5" />
                </div>
                <span className="text-md sm:text-2xl font-bold tracking-tighter italic">
                  RestOS
                </span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-8 mb-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold italic tracking-tighter hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 border-b border-zinc-900/10 dark:border-white/10 py-6">
                {/* <LanguageToggle /> */}
                <ThemeToggle />
              </div>
              <Link
                to="/login"
                className="block !mb-6 text-2xl font-bold italic hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.login")}
              </Link>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  size="xl"
                  className="w-full h-20 rounded-3xl text-2xl font-bold italic"
                >
                  {t("nav.get_started")}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
