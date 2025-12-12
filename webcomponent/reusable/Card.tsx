import { LucideProps } from "lucide-react";
import { ReactNode } from "react";

export interface CardProps {
  title: string;
  icon?: LucideProps;
  numString: string | number;
  belwoText: ReactNode | string;
  bgColor?: string;
}

export const Card = ({
  title,
  icon: Icon,
  numString,
  belwoText,
  bgColor,
}: CardProps) => {
  return (
    <div
      className="min-h-[200px] flex items-center rounded-lg p-6"
      style={{ backgroundColor: bgColor }}
    >
      <div className={`flex ${Icon ? "justify-between" : "flex-col"}`}>
        <div className="flex flex-col gap-2.5">
          <span className="text-sm dark:text-gray-300 text-[#90A1B9]">
            {title}
          </span>
          <span className="text-2xl lg:text-3xl">{numString}</span>
          {belwoText && <>{belwoText}</>}
        </div>
      </div>
    </div>
  );
};
