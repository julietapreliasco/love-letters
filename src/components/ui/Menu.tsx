import Button from "./Button";
import Logo from "./Logo";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";

interface MenuProps {
  onClick: () => void;
}

const Menu = ({ onClick }: MenuProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-custom-lighter-gray flex flex-col z-50">
      <div className="flex justify-between py-5 px-[10px]">
        <Logo color="#29241F" className="w-[104px] h-[30px]" />
        <button className="text-2xl text-custom-black" onClick={onClick}>
          &times;
        </button>
      </div>
      <div className="flex flex-col pt-[60px] items-center gap-10 flex-grow">
        <Button label="Projects" variant="SECONDARY_NAV" />
        <Button label="About me" variant="SECONDARY_NAV" />
        <Button label="Partners" variant="SECONDARY_NAV" />
        <Button label="Join us" />
      </div>
      <div className="flex flex-col gap-[10px] mt-auto mx-9 my-10 pt-[10px] items-center font-lato leading-[19.2px] border-t-[1px] border-custom-black">
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
