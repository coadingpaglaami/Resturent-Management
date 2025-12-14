import { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

export interface CardProps {
  title: string;
  icon?: LucideIcon;
  numString: string | number | ReactNode;
  belwoText?: ReactNode;
  bgColor?: string;
  bgWhite?: string;
  borderWhite?: string;
  borderBlack?: string;
  darkIconColor?: string;
  lightIconColor?: string;
}

export const Card = ({
  title,
  icon: Icon,
  numString,
  belwoText,
  bgColor,
  darkIconColor,
  lightIconColor,
  borderBlack,
  borderWhite,
  bgWhite,
}: CardProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-[200px] flex items-center rounded-lg w-full `}
      style={{
        boxShadow:
          theme === "dark"
            ? "none"
            : "0 1px 2px -1px rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        backgroundColor: theme === "dark" ? bgColor : bgWhite,
        border:
          theme === "dark"
            ? `1px solid ${borderBlack || '#314158'}`
            : `1px solid ${borderWhite  || '#E5E7EB'}`,
      }}
    >
      <div
        className={`flex ${Icon ? "justify-between" : "flex-col"} p-6 w-full`}
      >
        <div className="flex flex-col gap-2.5">
          <span className="text-sm dark:text-gray-300 text-[#90A1B9]">
            {title}
          </span>
          <span className="text-2xl lg:text-3xl">{numString}</span>
          {belwoText && <>{belwoText}</>}
        </div>
        {Icon && (
          <span
            className={`p-2.5 rounded-lg self-center ${theme === "dark" ? `bg-white/20` : `bg-black/10`}`}

          >
            <Icon
              className="w-6 h-6"
              color={theme === "dark" ? darkIconColor || '#00D492' : lightIconColor || '#4338CA'}
            />
          </span>
        )}
      </div>
    </div>
  );
};
