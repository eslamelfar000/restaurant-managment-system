import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useMemo, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { themeAtom, languageAtom } from "@/state/atoms";
import { ThemeToggle } from "@/components/shared/ThemeToggle/ThemeToggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle/LanguageToggle";

const SystemOwnerLoginPage = () => {
  const { t } = useTranslation(["system_owner", "bundle_details"]);
  const navigate = useNavigate();
  const theme = useRecoilValue(themeAtom);
  const language = useRecoilValue(languageAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
  }, [theme, language]);

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t("bundle_details:validation.email_invalid")),
        password: z
          .string()
          .min(8, t("bundle_details:validation.password_min")),
      }),
    [t],
  );

  type LoginFormValues = z.infer<typeof loginSchema>;

  const resolver = async (values: LoginFormValues) => {
    const result = await loginSchema.safeParseAsync(values);
    if (result.success) return { values: result.data, errors: {} };

    const errors = (result.error.issues || []).reduce(
      (acc, curr) => {
        const key = curr.path[0] as string;
        if (key && !acc[key]) {
          acc[key] = { type: curr.code, message: curr.message };
        }
        return acc;
      },
      {} as Record<string, any>,
    );

    return { values: {}, errors };
  };

  const form = useForm<LoginFormValues>({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("System Owner Login:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(t("system_owner:login.toast_success"));
    navigate("/system-owner");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#09090b] relative overflow-hidden p-4 transition-colors duration-500">
      {/* Floating Controls */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-primary/10 dark:bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="mb-8 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-2xl shadow-primary/20 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ShieldCheck className="text-white w-10 h-10" />
          </motion.div>
        </div>

        <Card className="border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden transition-colors duration-500">
          <CardHeader className="p-10 pb-2 text-center">
            <CardTitle className="text-4xl tracking-tighter text-zinc-900 dark:text-white leading-tight">
              {t("system_owner:login.title").split(" ")[0]}{" "}
              <span className="text-primary">
                {t("system_owner:login.title").split(" ")[1]}
              </span>
            </CardTitle>
            <CardDescription className="text-zinc-500 font-medium mt-2">
              {t("system_owner:login.subtitle")}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-10 pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-zinc-500  text-[10px]">
                        {t("system_owner:login.email_label")}
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            placeholder={t(
                              "system_owner:login.email_placeholder",
                            )}
                            className="h-14 rounded-xl bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/5 focus:border-primary/50 text-zinc-900 dark:text-white pl-12 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                            {...field}
                          />
                          <Mail
                            className="absolute left-4 top-4 text-zinc-400 dark:text-zinc-600 group-focus-within:text-primary transition-colors"
                            size={20}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px] text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-zinc-500  text-[10px]">
                        {t("system_owner:login.password_label")}
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            type="password"
                            placeholder={t(
                              "system_owner:login.password_placeholder",
                            )}
                            className="h-14 rounded-xl bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/5 focus:border-primary/50 text-zinc-900 dark:text-white pl-12 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                            {...field}
                          />
                          <Lock
                            className="absolute left-4 top-4 text-zinc-400 dark:text-zinc-600 group-focus-within:text-primary transition-colors"
                            size={20}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px] text-destructive" />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-14 rounded-xl text-sm  group relative overflow-hidden"
                    disabled={form.formState.isSubmitting}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {form.formState.isSubmitting &&
                      Object.keys(form.formState.errors).length === 0 ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t("system_owner:login.authenticating")}
                        </>
                      ) : (
                        <>
                          {t("system_owner:login.submit")}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </form>
            </Form>

            <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-white/5 flex flex-col gap-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors text-[10px] "
              >
                <ChevronLeft size={12} className="rtl:rotate-180" />
                {t("system_owner:login.return_to_surface")}
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-zinc-400 dark:text-zinc-600 text-[10px] tracking-[0.3em]">
          {t("system_owner:login.version")}
        </p>
      </motion.div>
    </div>
  );
};

export default SystemOwnerLoginPage;
