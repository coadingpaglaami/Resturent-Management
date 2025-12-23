import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface ButtonIconProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  varient?: "primary" | "secondaryTwo" | "default";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export const ButtonIcon = ({
  icon,
  children,
  varient,
  onClick,
  type = "button",
  disabled,
  className,
}: ButtonIconProps) => {
  return (
    <Button
      variant={varient != undefined ? varient : "primary"}
      className={cn(
        "flex items-center gap-3.5",
        className // ✅ override here
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon}
      {children}
    </Button>
  );
};
