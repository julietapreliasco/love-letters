interface ButtonProps {
  onClick?: () => void;
  variant?: "PRIMARY_NAV" | "SECONDARY_NAV" | "SECONDARY";
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  label: string;
}

const Button = ({ onClick, variant, type, disabled, label }: ButtonProps) => {
  let variantClass;
  switch (variant) {
    case "SECONDARY":
      variantClass =
        "border border-1 border-custom-gray hover:bg-custom-gray text-custom-black";
      break;
    case "PRIMARY_NAV":
      variantClass = "text-white";
      break;
    case "SECONDARY_NAV":
      variantClass = "text-custom-black";
      break;
    default:
      variantClass = "bg-custom-yellow hover:bg-[#dab431] text-custom-black";
  }

  return (
    <div className="w-fit h-fit">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${disabled ? "bg-custom-gray" : variantClass} font-lato uppercase font-bold text-[16px] leading-[19.2px] px-[24px] py-[10px] rounded-md`}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
