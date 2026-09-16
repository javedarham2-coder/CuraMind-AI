import { ShieldCheck } from "lucide-react";
import { FileUpload } from "@/components/assessment/FileUpload";

export default function ReportsStep() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-medical-100 bg-medical-50/40 p-4 flex items-start gap-3">
        <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center border border-medical-100">
          <ShieldCheck
            size={16}
            className="text-medical-500"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-navy">
            Optional but recommended
          </p>

          <p className="text-xs text-navy-300 mt-1 leading-relaxed">
            Uploading recent lab results, imaging or pathology reports
            can improve the accuracy of your CuraCore™ risk assessment.
            All uploaded files are encrypted and processed securely.
          </p>
        </div>
      </div>

      <FileUpload />
    </div>
  );
}
