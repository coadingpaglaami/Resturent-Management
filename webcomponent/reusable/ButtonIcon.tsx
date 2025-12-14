import { Button } from "@/components/ui/button";
interface ButtonIconProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  varient?: "primary" | "secondaryTwo" | "default";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const ButtonIcon = ({
  icon,
  children,
  varient,
  onClick,
  type = "button",
}: ButtonIconProps) => {
  return (
    <Button
      variant={varient != undefined ? varient : "primary"}
      className="flex items-center gap-3.5"
      onClick={onClick}
      type={type}
    >
      {icon}
      {children}
    </Button>
  );
};
