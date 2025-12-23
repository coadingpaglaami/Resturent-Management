"use client";

import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { ButtonIcon } from "@/webcomponent/reusable";

interface CsvUploaderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CsvUploaderDialog = ({
  open,
  onOpenChange,
}: CsvUploaderDialogProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file?: File) => {
    if (!file) return;
    if (file.type !== "text/csv") {
      alert("Only CSV files are allowed");
      return;
    }
    setFile(file);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-[90vw] h-[90vh] mx-auto bg-background text-foreground">
        <div className="flex flex-col gap-2.5 h-full w-full">
          {/* Left Header / Sidebar */}
          <DialogHeader className="p-6  ">
            <DialogTitle className="text-base font-semibold">
              CSV Uploader
            </DialogTitle>
          </DialogHeader>
          {/* Main Content */}
          <div className="flex items-center justify-center flex-1 w-full">
            <div
              className={`border rounded-2xl p-10 w-full max-w-lg text-center space-y-4 transition
          ${isDragging ? "border-dashed" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFile(e.dataTransfer.files?.[0]);
              }}
              onClick={() => inputRef.current?.click()}
            >
              {/* Hidden input */}
              <input
                ref={inputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              {/* Icon */}
              <div className="flex justify-center">
                <Upload className="h-10 w-10" />
              </div>

              {/* Text */}
              <p className="text-sm">
                {file
                  ? file.name
                  : "Drop your CSV file here or click to browse"}
              </p>

              <p className="text-xs opacity-80">
                Supported format: CSV with columns for SKU, Product Name, Pack
                Size, Price
              </p>

              {/* Button */}
              <div className="flex justify-center">
                <ButtonIcon
                  varient="primary"
                  type="button"
                  icon={<Upload className="h-4 w-4" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  Select File
                </ButtonIcon>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
