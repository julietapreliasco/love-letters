import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

interface SliderButtonProps {
  next?: boolean;
  onClick?: () => void;
}

const SliderButton = ({ next, onClick }: SliderButtonProps) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-custom-lighter-gray ${
      next ? 'right-5' : 'left-5'
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
