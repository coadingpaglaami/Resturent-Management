export interface VarienceProps {
  title: string;
  variance: {
    name: string;
    value?: string | number;
    numString: string | number;
    textColor: string;
  }[];
  borderColorDark?: string | "#314158";
  borderColorLight?: string | "#E5E7EB";
}

export const Varience = ({
  title,
  variance,
  borderColorDark,
  borderColorLight,
}: VarienceProps) => {
  return (
    <div
      className={
        "flex flex-col gap-5" +
        ` dark:border-[${
          borderColorLight != undefined ? borderColorLight : "#E5E7EB"
        }] border border-[${
          borderColorDark != undefined ? borderColorDark : "#314158"
        }] p-3 rounded-lg box-shadow-card `
      }
    >
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="flex flex-col gap-4 ">
        {variance.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="text-sm ">{item.name}</span>
              {item.value && (
                <span className={`dark:text-gray-300 text-gray-600 text-sm `}>
                  {item.value}
                </span>
              )}
            </div>

            <span
              className={`text-sm  `}
              style={{
                color: item.textColor,
              }}
            >
              {item.numString}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
