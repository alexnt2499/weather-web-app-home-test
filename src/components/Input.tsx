import React, { FC } from "react";

interface InputProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
}

const Input: FC<InputProps> = ({ value, onChange, label, className }) => {
  return (
    <div className={className}>
      <p>{label}</p>
      <input
        className="border border-gray-400 p-2 rounded-sm max-h-9 w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
