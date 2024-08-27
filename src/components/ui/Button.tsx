import React from "react";

interface ButtonProps {
  onClick?: () => void;
  variant?: "PRIMARY" | "SECONDARY" | "DISABLED";
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  label: string;
}

const Button = ({ onClick, variant, type, disabled, label }: ButtonProps) => {
  let variantClass;
  switch (variant) {
    case "SECONDARY":
      variantClass = "border border-1 border-custom-gray hover:bg-custom-gray";
      break;
    default:
      variantClass = "bg-custom-yellow hover:bg-[#dab431]";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${disabled ? "bg-custom-gray" : variantClass} font-lato text-custom-black uppercase font-bold text-[16px] leading-[19.2px] px-[24px] py-[10px] rounded-md`}
    >
      {label}
    </button>
  );
};

export default Button;
