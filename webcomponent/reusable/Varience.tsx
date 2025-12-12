export interface VarienceProps {
  title: string;
  variance: {
    name: string;
    value?: string | number;
    numString: string | number;
    textColor: string;
  }[];
}

export const Varience = ({ title, variance }: VarienceProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="flex flex-col gap-4 ">
        {variance.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <span className="text-sm text-gray-600">{item.name}</span>
              {item.value && (
                <span className="dark:text-gray-300 text-[#62748E]">
                  {item.value}
                </span>
              )}
            </div>

            <span className={`text-sm font-semibold ${item.textColor}`}>
              {item.numString}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
