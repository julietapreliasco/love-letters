import Link from 'next/link';

interface ButtonProps {
  onClick?: () => void;
  variant?: 'PRIMARY_NAV' | 'SECONDARY_NAV' | 'SECONDARY';
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  label: string;
  className?: string;
  linkTo?: string;
}

const Button = ({
  onClick,
  variant,
  type,
  disabled,
  label,
  className,
  linkTo = '',
}: ButtonProps) => {
  let variantClass;
  switch (variant) {
    case 'SECONDARY':
      variantClass =
        'border border-1 border-custom-gray hover:bg-custom-gray text-custom-black';
      break;
    case 'PRIMARY_NAV':
      variantClass =
        'text-white transition-transform transform hover:scale-105 duration-200';
      break;
    case 'SECONDARY_NAV':
      variantClass =
        'text-custom-black transition-transform transform hover:scale-105 duration-200';
      break;
    default:
      variantClass = 'bg-custom-yellow hover:bg-[#dab431] text-custom-black';
  }

  return (
    <div className={className ?? 'h-fit w-fit'}>
      <Link href={linkTo}>
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`${disabled ? 'bg-custom-gray' : variantClass} ${className ?? ''} rounded-md px-[24px] py-[10px] font-lato text-base font-bold uppercase 2xl:text-xl`}
        >
          {label}
        </button>
      </Link>
    </div>
  );
};

export default Button;
