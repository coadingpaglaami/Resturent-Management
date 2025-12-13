"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  error?: string; // for future Zod validation
  className?: string;
}

export const InputField: React.FC<TextInputProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`w-full`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
