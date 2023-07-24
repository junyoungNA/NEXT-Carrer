import React from "react";
import cls from "classnames";

type optionProp = {
  text : string;
  value : string;
}

interface SelectGroupProps {
  className?: string;
  value: string;
  error: string | undefined;
  options : optionProp[];
  setValue: (str: string) => void;
}

const SelectGroup: React.FC<SelectGroupProps> = ({
  className = "mb-2",
  value,
  error,
  options,
  setValue,
}) => {
  return (
    <div className={className}>
      <select
        style={{ minWidth: 300 }}
        className={cls(
          `my-0.5 w-full p-3 duration-200 border focus:outline-none transition-all focus:h-60 border-gray-400 rounded bg-gray-50 focus:bg-white hover:bg-white`,
          { "border-red-500": error }
        )}
        value={value}
        onChange={e => setValue(e.target.value)}
      >
        {options.map((option) => 
          <option value={option.value}>{option.text}</option>
        )}
      </select>
      <small className="font-medium text-red-500">{error}</small>
    </div>
  );
};

export default SelectGroup;
