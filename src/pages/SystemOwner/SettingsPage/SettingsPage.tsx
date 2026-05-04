import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BrandIdentity } from "@/modules/SystemOwner/Settings/components/BrandIdentity";
import { OperationsControl } from "@/modules/SystemOwner/Settings/components/OperationsControl";
import { LegalDocuments } from "@/modules/SystemOwner/Settings/components/LegalDocuments";

const SettingsPage = () => {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("System configuration updated successfully.");
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold dark:text-white leading-none">
            System <span className="text-primary">Configuration</span>
          </h2>
          <p className="text-zinc-500 text-sm tracking-tight mt-2">
            Global Assets / Legal Documents / Operations Control
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-2xl h-14 px-10 flex items-center gap-3 shadow-xl shadow-primary/20 group"
        >
          <Save size={20} className={isSaving ? "animate-spin" : "group-hover:scale-110 transition-transform"} />
          <span className="font-semibold">{isSaving ? "Synchronizing..." : "Save Changes"}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Core Identity & Operations */}
        <div className="lg:col-span-1 space-y-10">
          <BrandIdentity />
          <OperationsControl 
            isMaintenance={isMaintenance} 
            setIsMaintenance={setIsMaintenance} 
          />
        </div>

        {/* Right Column: Legal & Content */}
        <div className="lg:col-span-2">
          <LegalDocuments 
            privacyPolicy={privacyPolicy}
            setPrivacyPolicy={setPrivacyPolicy}
            termsAndConditions={termsAndConditions}
            setTermsAndConditions={setTermsAndConditions}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
