interface HeadingProps {
  title: string;
  subtitle?: string;
}

export const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
      )}
    </div>
  );
};
