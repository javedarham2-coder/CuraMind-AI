import { useState, useRef } from "react";
import { UploadCloud, FileText, X, FileImage, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Uploaded = { name: string; size: string; type: string };

export function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<Uploaded[]>([
    { name: "blood-panel-2024.pdf", size: "1.2 MB", type: "pdf" },
    { name: "mri-scan.jpg", size: "3.8 MB", type: "image" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const next: Uploaded[] = Array.from(list).map((f) => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      type: f.type.includes("image") ? "image" : f.name.endsWith(".pdf") ? "pdf" : "file",
    }));
    setFiles((prev) => [...prev, ...next]);
  };

  const remove = (name: string) =>
    setFiles((prev) => prev.filter((f) => f.name !== name));

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          onFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={cn(
          "relative cursor-pointer rounded-2xl border-2 border-dashed bg-surface-subtle/60 transition-all duration-200",
          "px-6 py-10 text-center",
          isDragging
            ? "border-medical-500 bg-medical-50/50"
            : "border-surface-border hover:border-medical-300 hover:bg-surface-subtle"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
          accept=".pdf,.jpg,.jpeg,.png,.dcm"
        />

        <motion.div
          animate={{ y: isDragging ? -4 : 0 }}
          className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-medical-50 to-cyan-50 border border-medical-100 flex items-center justify-center"
        >
          <UploadCloud size={24} className="text-medical-500" />
        </motion.div>
        <p className="mt-4 text-sm font-semibold text-navy">
          {isDragging ? "Drop files to upload" : "Drag & drop medical reports"}
        </p>
        <p className="mt-1 text-xs text-navy-200">
          or <span className="text-medical-500 font-medium">browse files</span> · PDF, JPG, PNG,
          DICOM up to 25 MB
        </p>
        <p className="mt-3 text-[11px] text-navy-200/70">
          All files are encrypted in transit and at rest. Your data is never used to train models.
        </p>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {files.map((f) => {
              const Icon = f.type === "pdf" ? FileText : f.type === "image" ? FileImage : File;
              return (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="flex items-center gap-3 rounded-xl border border-surface-border bg-white px-3.5 py-2.5"
                >
                  <div className="h-9 w-9 rounded-lg bg-medical-50 flex items-center justify-center">
                    <Icon size={16} className="text-medical-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy truncate">{f.name}</p>
                    <p className="text-xs text-navy-200">{f.size} · Uploaded</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(f.name);
                    }}
                    className="h-7 w-7 rounded-lg text-navy-200 hover:text-navy hover:bg-surface-muted flex items-center justify-center"
                    aria-label={`Remove ${f.name}`}
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
