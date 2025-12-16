import { Button } from "@/components/ui/button";
interface ButtonIconProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  varient?: "primary" | "secondaryTwo" | "default";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const ButtonIcon = ({
  icon,
  children,
  varient,
  onClick,
  type = "button",
  disabled
}: ButtonIconProps) => {
  return (
    <Button
      variant={varient != undefined ? varient : "primary"}
      className="flex items-center gap-3.5"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon}
      {children}
    </Button>
  );
};
