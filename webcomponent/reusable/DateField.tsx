"use client";

import * as React from "react";
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateFieldProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DateField({
  label,
  value,
  onChange,
  placeholder,
  className,
  disabled,
}: DateFieldProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value
  );

  // Selected date = controlled value or internal state
  const selectedDate = value ?? internalDate;

  // Today formatted as local date string
  const today = new Date().toLocaleDateString();

  const handleSelect = (date: Date | undefined) => {
    setInternalDate(date);
    onChange?.(date);
    setOpen(false);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <Label htmlFor={label.toLowerCase().replace(/\s+/g, "-")}>
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className="w-56 justify-between font-normal"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : placeholder ?? today}
            </div>
            <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 overflow-hidden" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
