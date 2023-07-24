import React from "react";
import cls from "classnames";

interface TextGroupProps {
  className?: string;
  placeholder?: string;
  rows?: number;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const TextGroup: React.FC<TextGroupProps> = ({
  className = "mb-2",
  placeholder = "",
  rows = 1,
  value,
  error,
  setValue,
}) => {
  return (
    <div className={className}>
      <textarea
        style={{ minWidth: 300 }}
        rows={rows}
        className={cls(
          `my-0.5 w-full p-3 duration-200 border focus:outline-none transition-all focus:h-60 border-gray-400 rounded bg-gray-50 focus:bg-white hover:bg-white`,
          { "border-red-500": error }
        )}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <small className="font-medium text-red-500">{error}</small>
    </div>
  );
};

export default TextGroup;
