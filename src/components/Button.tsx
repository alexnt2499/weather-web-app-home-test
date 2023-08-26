import React, { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  className,
  children,
  isLoading,
}) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm ${className} ${
        isLoading ? "cursor-not-allowed bg-blue-700" : ""
      }`}
      onClick={onClick}
    >
      {isLoading ? "Waiting..." : children}
    </button>
  );
};

export default Button;
