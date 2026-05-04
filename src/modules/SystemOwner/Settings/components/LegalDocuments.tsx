import { FileText, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface LegalDocumentsProps {
  privacyPolicy: string;
  setPrivacyPolicy: (val: string) => void;
  termsAndConditions: string;
  setTermsAndConditions: (val: string) => void;
}

export const LegalDocuments = ({
  privacyPolicy,
  setPrivacyPolicy,
  termsAndConditions,
  setTermsAndConditions
}: LegalDocumentsProps) => {
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
  ];

  return (
    <div className="space-y-8">
      <Card className="border-zinc-200 dark:border-white/5 bg-white dark:bg-white/[0.02] rounded-3xl overflow-hidden shadow-sm">
        <CardHeader className="p-8">
          <CardTitle className="text-xl font-semibold flex items-center gap-2 leading-none">
            <FileText className="text-primary" size={24} />
            Privacy Policy
          </CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest mt-1">Managed via Global CDN for all tenant instances</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
           <div className="quill-wrapper">
             <ReactQuill 
               theme="snow" 
               value={privacyPolicy} 
               onChange={setPrivacyPolicy}
               modules={quillModules}
               formats={quillFormats}
               placeholder="Enter privacy policy terms..."
             />
           </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-200 dark:border-white/5 bg-white dark:bg-white/[0.02] rounded-3xl overflow-hidden shadow-sm">
        <CardHeader className="p-8">
          <CardTitle className="text-xl font-semibold flex items-center gap-2 leading-none">
            <ShieldAlert className="text-primary" size={24} />
            Terms & Conditions
          </CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest mt-1">Global service level agreement manifest</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
           <div className="quill-wrapper">
             <ReactQuill 
               theme="snow" 
               value={termsAndConditions} 
               onChange={setTermsAndConditions}
               modules={quillModules}
               formats={quillFormats}
               placeholder="Enter global terms and conditions..."
             />
           </div>
        </CardContent>
      </Card>

      <style>{`
        .quill-wrapper .ql-toolbar {
          border-radius: 16px 16px 0 0 !important;
          border-color: var(--border-color) !important;
          background: var(--toolbar-bg) !important;
          padding: 12px 16px !important;
        }
        .quill-wrapper .ql-container {
          border-radius: 0 0 16px 16px !important;
          border-color: var(--border-color) !important;
          min-height: 280px;
          font-family: inherit !important;
          font-size: 15px;
          background: var(--editor-bg) !important;
        }
        .quill-wrapper .ql-editor {
          color: var(--editor-text) !important;
          padding: 20px !important;
        }
        .quill-wrapper .ql-stroke {
          stroke: var(--icon-color) !important;
        }
        .quill-wrapper .ql-fill {
          fill: var(--icon-color) !important;
        }
        .quill-wrapper .ql-picker {
          color: var(--icon-color) !important;
        }
        .quill-wrapper .ql-editor.ql-blank::before {
          color: #888 !important;
          font-style: normal !important;
          left: 20px !important;
        }

        :root {
          --border-color: rgba(0,0,0,0.1);
          --toolbar-bg: rgba(0,0,0,0.02);
          --editor-bg: #fff;
          --editor-text: #242424;
          --icon-color: #444;
        }

        .dark {
          --border-color: rgba(255,255,255,0.1);
          --toolbar-bg: rgba(255,255,255,0.02);
          --editor-bg: transparent;
          --editor-text: #fff;
          --icon-color: #888;
        }
      `}</style>
    </div>
  );
};
