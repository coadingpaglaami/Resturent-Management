interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export const Header = ({ title, children }: HeaderProps) => {
  return (
    <div
      className="flex flex-col gap-4 box-shadow-card p-4 rounded-lg bg-white border border-gray-200
    dark:border-gray-700 dark:bg-gray-800"
    >
      <span className="text-base ">{title}</span>
      {children}
    </div>
  );
};
