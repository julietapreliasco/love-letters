import Button from './Button';
import Logo from './Logo';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';

interface MenuProps {
  onClick: () => void;
}

const Menu = ({ onClick }: MenuProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col bg-custom-lighter-gray">
      <div className="flex justify-between px-[10px] py-5">
        <Logo color="#29241F" className="h-[30px] w-[104px]" />
        <button className="text-2xl text-custom-black" onClick={onClick}>
          &times;
        </button>
      </div>
      <div className="flex flex-grow flex-col items-center gap-10 pt-[60px]">
        <Button label="Projects" variant="SECONDARY_NAV" />
        <Button label="About me" variant="SECONDARY_NAV" />
        <Button label="Partners" variant="SECONDARY_NAV" />
        <Button label="Join us" />
      </div>
      <div className="mx-9 my-10 mt-auto flex flex-col items-center gap-[10px] border-t-[1px] border-custom-black pt-[10px] font-lato leading-[19.2px]">
        <span>Follow us:</span>
        <div className="flex gap-5 text-3xl text-custom-black">
          <FaInstagram />
          <FaYoutube />
          <FaFacebook />
          <FaLinkedin />
        </div>
      </div>
    </div>
  );
};

export default Menu;
