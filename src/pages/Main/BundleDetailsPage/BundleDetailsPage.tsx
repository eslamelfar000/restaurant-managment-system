import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Check, 
  ArrowLeft, 
  Store, 
  User, 
  Mail, 
  Phone, 
  Lock,
  ChevronRight,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const BundleDetailsPage = () => {
  const { t } = useTranslation(["bundle_details", "landing"]);
  const { bundleId } = useParams();
  const navigate = useNavigate();

  const subscriptionSchema = useMemo(() => z.object({
    tenantName: z.string()
      .min(1, t("bundle_details:validation.restaurant_min"))
      .min(3, t("bundle_details:validation.restaurant_min")),
    adminName: z.string()
      .min(1, t("bundle_details:validation.name_min"))
      .min(3, t("bundle_details:validation.name_min")),
    adminEmail: z.string()
      .min(1, t("bundle_details:validation.email_invalid"))
      .email(t("bundle_details:validation.email_invalid")),
    adminPhone: z.string()
      .min(1, t("bundle_details:validation.phone_min"))
      .min(10, t("bundle_details:validation.phone_min"))
      .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, t("bundle_details:validation.phone_invalid")),
    adminPassword: z.string()
      .min(1, t("bundle_details:validation.password_min"))
      .min(8, t("bundle_details:validation.password_min")),
  }), [t]);

  type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

  const resolver = async (values: SubscriptionFormValues) => {
    const result = await subscriptionSchema.safeParseAsync(values);
    
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const issues = result.error.issues || [];
    const errors = issues.reduce((acc, curr) => {
      const key = curr.path[0] as string;
      if (key && !acc[key]) {
        acc[key] = {
          type: curr.code,
          message: curr.message,
        };
      }
      return acc;
    }, {} as Record<string, any>);

    return {
      values: {},
      errors,
    };
  };

  const form = useForm<SubscriptionFormValues>({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      tenantName: "",
      adminName: "",
      adminEmail: "",
      adminPhone: "",
      adminPassword: "",
    },
  });

  const bundles = useMemo(() => ({
    starter: {
      name: t("landing:pricing.bundles.starter.name"),
      price: "$49",
      features: [
        "Up to 50 items",
        "Digital Menu",
        "Basic Analytics",
        "1 Location"
      ],
    },
    pro: {
      name: t("landing:pricing.bundles.pro.name"),
      price: "$99",
      features: [
        "Unlimited items",
        "Order Management",
        "Staff Accounts",
        "3 Locations"
      ],
    },
    enterprise: {
      name: t("landing:pricing.bundles.enterprise.name"),
      price: t("landing:pricing.custom"),
      features: [
        "All Pro Features",
        "Custom Integrations",
        "API Access",
        "Unlimited Locations"
      ],
    },
  }), [t]);

  const bundle = bundles[bundleId as keyof typeof bundles] || bundles.pro;

  const onSubmit = async (data: SubscriptionFormValues) => {
    console.log("Subscription data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success(t("bundle_details:toast_success"));
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background text-foreground relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-primary/20 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-blue-500/10 blur-[150px] rounded-full -z-10" />

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground hover:bg-zinc-900/5 dark:hover:bg-white/5 rounded-full px-6"
          >
            <ArrowLeft className="mr-2 w-4 h-4 rtl:rotate-180" />
            {t("bundle_details:back")}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Bundle Info */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6">
                <Zap size={16} className="fill-primary" />
                <span className="text-xs font-black uppercase tracking-widest">{t("bundle_details:badge")}</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-black mb-6 uppercase italic tracking-tighter leading-none text-foreground">
                {t("bundle_details:title_top")} <br />
                <span className="text-primary">{t("bundle_details:title_bottom")}</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-md">
                {t("bundle_details:subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-10 rounded-[3rem] border border-zinc-900/10 dark:border-white/10 bg-zinc-900/5 dark:bg-white/5 backdrop-blur-3xl shadow-2xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">{bundle.name}</h3>
                  <p className="text-zinc-500 font-black uppercase text-sm tracking-widest mt-1">{t("bundle_details:active_plan")}</p>
                </div>
                <div className="text-4xl font-black text-primary">
                  {bundle.price}
                  {bundle.price !== t("landing:pricing.custom") && <span className="text-lg font-bold">/{t("landing:pricing.mo")}</span>}
                </div>
              </div>
              
              <ul className="space-y-6">
                {bundle.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-bold text-foreground">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="flex items-center gap-6 p-8 rounded-[2rem] bg-zinc-900/5 dark:bg-zinc-900/50 border border-zinc-900/5 dark:border-white/5">
               <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-2xl font-black text-white">
                 {t("bundle_details:testimonial.author").charAt(0)}
               </div>
               <div className="text-foreground">
                 <p className="text-lg font-bold italic">{t("bundle_details:testimonial.quote")}</p>
                 <p className="text-sm text-zinc-500 font-black uppercase tracking-widest mt-1">{t("bundle_details:testimonial.author")}</p>
               </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="rounded-[3rem] border-zinc-900/10 dark:border-white/10 bg-card shadow-2xl overflow-hidden">
                <CardHeader className="p-12 pb-6 border-b border-zinc-900/5 dark:border-white/5">
                  <CardTitle className="text-4xl font-black uppercase italic tracking-tighter text-foreground">{t("bundle_details:form.title")}</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground mt-2 font-medium">
                    {t("bundle_details:form.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-12 pt-10">
                  <Form {...form}>
                    <form 
                      onSubmit={form.handleSubmit(onSubmit)} 
                      noValidate 
                      className="space-y-10"
                    >
                      {/* Tenant Information */}
                      <FormField
                        control={form.control}
                        name="tenantName"
                        render={({ field }) => (
                          <FormItem className="space-y-6">
                            <FormLabel className="text-zinc-500 font-black uppercase tracking-widest text-xs">{t("bundle_details:form.labels.restaurant")}</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  placeholder={t("bundle_details:form.placeholders.restaurant")}
                                  className="h-16 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border-zinc-900/10 dark:border-white/10 text-xl font-bold px-6 focus:border-primary transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                                  {...field}
                                />
                                <Store className="absolute ltr:right-6 rtl:left-6 top-5 text-zinc-400 dark:text-zinc-700" size={24} />
                              </div>
                            </FormControl>
                            <FormMessage className="text-sm text-destructive font-bold" />
                          </FormItem>
                        )}
                      />

                      {/* Admin Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        <FormField
                          control={form.control}
                          name="adminName"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-zinc-500 font-black uppercase tracking-widest text-xs">{t("bundle_details:form.labels.name")}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t("bundle_details:form.placeholders.name")}
                                  className="h-14 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border-zinc-900/10 dark:border-white/10 text-lg font-bold px-6 focus:border-primary transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-sm text-destructive font-bold" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="adminPhone"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-zinc-500 font-black uppercase tracking-widest text-xs">{t("bundle_details:form.labels.phone")}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t("bundle_details:form.placeholders.phone")}
                                  className="h-14 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border-zinc-900/10 dark:border-white/10 text-lg font-bold px-6 focus:border-primary transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-sm text-destructive font-bold" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="adminEmail"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-zinc-500 font-black uppercase tracking-widest text-xs">{t("bundle_details:form.labels.email")}</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder={t("bundle_details:form.placeholders.email")}
                                  className="h-14 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border-zinc-900/10 dark:border-white/10 text-lg font-bold px-6 focus:border-primary transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-sm text-destructive font-bold" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="adminPassword"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-zinc-500 font-black uppercase tracking-widest text-xs">{t("bundle_details:form.labels.password")}</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password"
                                  placeholder={t("bundle_details:form.placeholders.password")}
                                  className="h-14 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border-zinc-900/10 dark:border-white/10 text-lg font-bold px-6 focus:border-primary transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-sm text-destructive font-bold" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="pt-10">
                        <Button 
                          type="submit" 
                          size="xl"
                          disabled={form.formState.isSubmitting}
                          className="w-full h-24 flex items-center gap-2 rounded-[2.5rem] text-2xl font-black uppercase italic shadow-[0_25px_60px_-15px_rgba(255,121,102,0.4)] group transition-all"
                        >
                          {form.formState.isSubmitting && Object.keys(form.formState.errors).length === 0 
                            ? t("bundle_details:form.submitting") 
                            : t("bundle_details:form.submit")}
                          {!form.formState.isSubmitting && <ChevronRight className="!size-8 group-hover:translate-x-2 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />}
                        </Button>
                        <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-600 mt-8">
                          {t("bundle_details:form.encryption")}
                        </p>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleDetailsPage;
