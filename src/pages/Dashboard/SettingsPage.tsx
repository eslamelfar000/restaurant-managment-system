import { useState } from "react";
import {
  Globe,
  ShieldCheck,
  Palette,
  Mail,
  Phone,
  Share2,
  FileText,
  Save,
  Upload,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageTransition } from "@/components/shared/layout/PageTransition";
import { ModuleHeader } from "@/components/shared/layout/ModuleHeader";

const SettingsPage = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  return (
    <PageTransition className="space-y-8 w-full">
      <ModuleHeader
        title="Restaurant configuration"
        subtitle="Instance Control / Global Branding & Legal Manifesto"
      />

      <Tabs defaultValue="branding" className="space-y-6 w-full">
        <div className="overflow-x-auto pb-2 custom-scrollbar">
          <TabsList className="bg-zinc-100 dark:bg-white/5 p-1 rounded-[1.5rem] h-16 border border-zinc-200 dark:border-white/10 min-w-[600px] lg:min-w-0 w-full flex items-stretch">
            <TabsTrigger
              value="branding"
              className="flex-1 rounded-[1.2rem] px-6 transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-primary/30"
            >
              <Palette size={18} className="mr-2" />
              Branding
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex-1 rounded-[1.2rem] px-6 transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-primary/30"
            >
              <Mail size={18} className="mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="flex-1 rounded-[1.2rem] px-6 transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-primary/30"
            >
              <Share2 size={18} className="mr-2" />
              Social Links
            </TabsTrigger>
            <TabsTrigger
              value="legal"
              className="flex-1 rounded-[1.2rem] px-6 transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-primary/30"
            >
              <FileText size={18} className="mr-2" />
              Legal
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="branding"
          className="space-y-6 animate-in fade-in slide-in-from-bottom-2"
        >
          <Card className="rounded-[2.5rem] border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="text-xl">App Identity</CardTitle>
              <CardDescription>
                How your restaurant appears to your customers.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-500 ml-1">
                      Restaurant Name
                    </Label>
                    <Input
                      placeholder="KitchenSync Gourmet"
                      className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-500 ml-1">
                      Accent Color
                    </Label>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-primary border-4 border-white dark:border-zinc-800 shadow-lg" />
                      <Input
                        defaultValue="#FF7966"
                        className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 font-mono"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-xs text-zinc-500 ml-1">
                    Brand Logo
                  </Label>
                  <label className="h-44 w-full rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 bg-zinc-50/50 dark:bg-white/5 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setLogoPreview(URL.createObjectURL(file));
                      }}
                    />
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Preview"
                        className="h-full w-full object-contain p-4"
                      />
                    ) : (
                      <>
                        <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload
                            size={24}
                            className="text-zinc-400 group-hover:text-primary transition-colors"
                          />
                        </div>
                        <div className="text-center">
                          <span className="text-[10px] text-zinc-500 block">
                            Drag & Drop Logo
                          </span>
                          <span className="text-[8px] font-bold text-zinc-400">
                            PNG, SVG or WEBP (Max 2MB)
                          </span>
                        </div>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8 bg-zinc-50/50 dark:bg-white/5 border-t border-zinc-100 dark:border-white/5 flex justify-end">
              <Button className="h-12 rounded-2xl px-8 gap-2 shadow-lg shadow-primary/20">
                <Save size={18} />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent
          value="contact"
          className="animate-in fade-in slide-in-from-bottom-2"
        >
          <Card className="rounded-[2.5rem] border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-bold">
                Contact Information
              </CardTitle>
              <CardDescription>
                Public contact details for your digital menu and receipts.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs text-zinc-500 ml-1 text-primary flex items-center gap-2">
                    <Mail size={12} />
                    Public Email
                  </Label>
                  <Input
                    placeholder="hello@restaurant.com"
                    className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-zinc-500 ml-1 text-primary flex items-center gap-2">
                    <Phone size={12} />
                    Phone Number
                  </Label>
                  <Input
                    placeholder="+1 234 567 890"
                    className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-xs text-zinc-500 ml-1">
                    Restaurant Address
                  </Label>
                  <Textarea
                    placeholder="123 Gourmet Street, Food City"
                    className="min-h-[100px] rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 resize-none py-4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent
          value="social"
          className="animate-in fade-in slide-in-from-bottom-2"
        >
          <Card className="rounded-[2.5rem] border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-bold">
                Social Manifest
              </CardTitle>
              <CardDescription>
                Connect your digital presence to your restaurant profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 flex items-center gap-2">
                    <FaFacebook size={14} className="text-blue-600" />
                    Facebook URL
                  </Label>
                  <Input
                    placeholder="facebook.com/your-restaurant"
                    className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 flex items-center gap-2">
                    <FaInstagram size={14} className="text-pink-600" />
                    Instagram Handle
                  </Label>
                  <Input
                    placeholder="@your.restaurant"
                    className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 flex items-center gap-2">
                    <FaTwitter size={14} className="text-sky-500" />
                    Twitter / X Profile
                  </Label>
                  <Input
                    placeholder="x.com/your-restaurant"
                    className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 focus-visible:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 flex items-center gap-2">
                    <Globe size={14} className="text-primary" />
                    Official Website
                  </Label>
                  <Input
                    placeholder="https://www.your-restaurant.com"
                    className="h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 focus-visible:ring-primary/20"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8 bg-zinc-50/50 dark:bg-white/5 border-t border-zinc-100 dark:border-white/5 flex justify-end">
              <Button className="h-12 rounded-2xl px-8 gap-2 shadow-lg shadow-primary/20">
                <Save size={18} />
                Deploy Social Links
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent
          value="legal"
          className="animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-[2.5rem] border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <ShieldCheck className="text-green-500" />
                  Terms of Service
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <Textarea
                  placeholder="Paste your terms of service here..."
                  className="min-h-[300px] rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 resize-none py-4"
                />
              </CardContent>
            </Card>
            <Card className="rounded-[2.5rem] border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <FileText className="text-blue-500" />
                  Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <Textarea
                  placeholder="Paste your privacy policy here..."
                  className="min-h-[300px] rounded-2xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 resize-none py-4"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageTransition>
  );
};

export default SettingsPage;
