import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

interface SliderButtonProps {
  next?: boolean;
  onClick?: () => void;
  isPartners?: boolean;
}

const SliderButton = ({ next, onClick, isPartners }: SliderButtonProps) => (
  <button
    onClick={onClick}
    className={`absolute ${isPartners ? 'top-20 lg:top-32 xl:top-1/2' : 'top-1/2'} z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-custom-lighter-gray ${
      isPartners
        ? next
          ? 'right-[-50px]'
          : 'left-[-50px]'
        : next
          ? 'right-5'
          : 'left-5'
    }`}
  >
    {next ? (
      <GrLinkNext className="h-4 w-4 text-custom-black" />
    ) : (
      <GrLinkPrevious className="h-4 w-4 text-custom-black" />
    )}
  </button>
);

export default SliderButton;
