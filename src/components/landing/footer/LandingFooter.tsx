import { Link } from "react-router-dom";
import { UtensilsCrossed, Mail, ArrowUpRight } from "lucide-react";
import { FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { LanguageToggle } from "../../shared/LanguageToggle/LanguageToggle";
import { ThemeToggle } from "../../shared/ThemeToggle/ThemeToggle";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const LandingFooter = () => {
  const { t } = useTranslation("landing");

  return (
    <footer className="relative overflow-hidden bg-background pt-32 pb-12 border-t border-zinc-900/5 dark:border-white/5">
      {/* Decorative Brand Text */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none overflow-hidden select-none translate-y-1/2 opacity-[0.03] dark:opacity-[0.05]">
        <h2 className="text-[25vw] font-bold tracking-tighter leading-none whitespace-nowrap italic">
          RestaurantOS
        </h2>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="bg-primary p-3 rounded-2xl text-white shadow-xl shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
                <UtensilsCrossed size={32} />
              </div>
              <span className="text-4xl font-bold tracking-tighter italic text-foreground">
                RestaurantOS
              </span>
            </Link>

            <p className="text-2xl text-muted-foreground leading-tight max-w-md font-medium">
              {t("footer.slogan")}
            </p>

            <div className="flex items-center gap-6">
              {[
                { icon: FaTwitter, href: "#" },
                { icon: FaGithub, href: "#" },
                { icon: FaLinkedinIn, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-14 h-14 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
                >
                  <social.icon
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {[
              {
                title: t("footer.sections.platform"),
                links: ["Features", "Pricing", "Integrations", "Enterprise"],
              },
              {
                title: t("footer.sections.resources"),
                links: ["Documentation", "API Status", "Case Studies", "Blog"],
              },
              {
                title: t("footer.sections.company"),
                links: ["About Us", "Careers", "Security", "Contact"],
              },
            ].map((section, idx) => (
              <div key={idx} className="space-y-6">
                 <h4 className="text-xs font-bold tracking-[0.3em] text-foreground">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center group font-medium"
                      >
                        {link}
                        <ArrowUpRight
                          size={14}
                          className="opacity-0 group-hover:opacity-100 transition-all ml-1 -translate-x-1 group-hover:translate-x-0"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-zinc-900/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-xs font-bold tracking-widest text-muted-foreground">
            <span>{t("footer.copyright")}</span>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 bg-zinc-900/5 dark:bg-white/5 p-2 rounded-2xl border border-zinc-900/10 dark:border-white/10">
              <LanguageToggle />
              <div className="h-8 w-[2px] bg-zinc-900/10 dark:bg-white/10 rounded-full" />
              <ThemeToggle />
            </div>
            <a
              href="mailto:hello@restaurantos.com"
              className="flex items-center gap-2 bg-zinc-900/5 dark:bg-white/5 px-6 py-3 rounded-full border border-zinc-900/10 dark:border-white/10 hover:border-primary/50 transition-all group"
            >
              <Mail size={16} className="text-primary" />
              <span className="text-xs font-bold tracking-widest italic">
                hello@restaurantos.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
