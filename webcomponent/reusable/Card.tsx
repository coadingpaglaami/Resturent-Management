"use client";

import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface CardProps {
  title: string;
  icon?: LucideIcon;
  numString: string | number | ReactNode;
  belwoText?: ReactNode;

  // optional overrides
  bgColor?: string; // dark background
  bgWhite?: string; // light background
  borderBlack?: string; // dark border
  borderWhite?: string; // light border
  darkIconColor?: string; // dark icon color
  lightIconColor?: string; // light icon color
}

export const Card = ({
  title,
  icon: Icon,
  numString,
  belwoText,
  bgColor,
  bgWhite,
  borderBlack,
  borderWhite,
  darkIconColor,
  lightIconColor,
}: CardProps) => {
  return (
    <div
      className="
        min-h-[200px] w-full flex items-center rounded-lg
        bg-(--card-bg-light)
        dark:bg-(--card-bg-dark)
        border
        border-(--card-border-light)
        dark:border-(--card-border-dark)
        shadow-sm
        dark:shadow-none
      "
      style={
        {
          "--card-bg-light": bgWhite ?? "#FFFFFF",
          "--card-bg-dark": bgColor ?? "#0B1220",
          "--card-border-light": borderWhite ?? "#E5E7EB",
          "--card-border-dark": borderBlack ?? "#314158",
          "--icon-light": lightIconColor ?? "#4338CA",
          "--icon-dark": darkIconColor ?? "#00D492",
        } as React.CSSProperties
      }
    >
      <div
        className={`flex w-full p-6 ${Icon ? "justify-between" : "flex-col"}`}
      >
        <div className="flex flex-col gap-2.5">
          <span className="text-sm text-[#90A1B9] dark:text-gray-300">
            {title}
          </span>

          <span className="text-2xl lg:text-3xl text-gray-900 dark:text-white">
            {numString}
          </span>

          {belwoText}
        </div>

        {Icon && (
          <span className="p-2.5 rounded-lg self-center bg-black/10 dark:bg-white/20">
            <Icon
              className="
                w-6 h-6
                text-(--icon-light)
                dark:text-(--icon-dark)
              "
            />
          </span>
        )}
      </div>
    </div>
  );
};
