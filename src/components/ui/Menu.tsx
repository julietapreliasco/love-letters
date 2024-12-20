import Link from 'next/link';
import Button from './Button';
import Logo from './Logo';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { useScrollLock } from '@/utils/scrollLock';

interface MenuProps {
  onClick: () => void;
}

const Menu = ({ onClick }: MenuProps) => {
  useScrollLock();
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col bg-custom-lighter-gray">
      <div className="flex justify-between px-[10px] py-5">
        <Link href="/about-me">
          <Logo color="#29241F" className="h-[30px] w-[104px]" />
        </Link>
        <button className="text-2xl text-custom-black" onClick={onClick}>
          &times;
        </button>
      </div>
      <div className="flex flex-grow flex-col items-center gap-5 py-5">
        <Button
          onClick={onClick}
          linkTo="/places"
          label="Places"
          variant="SECONDARY_NAV"
        />
        <Button
          onClick={onClick}
          linkTo="/partners"
          label="Partners"
          variant="SECONDARY_NAV"
        />
        <Button
          onClick={onClick}
          linkTo="/press"
          label="Press"
          variant="SECONDARY_NAV"
        />
        <Button
          onClick={onClick}
          linkTo="/academy"
          label="Academy"
          variant="SECONDARY_NAV"
        />
        <Button
          onClick={onClick}
          linkTo="/about-me"
          label="About"
          variant="SECONDARY_NAV"
        />
        <Button
          onClick={onClick}
          linkTo="/speaking"
          label="Speaking"
          variant="SECONDARY_NAV"
        />
        <Button
          onClick={onClick}
          linkTo="/coming-next"
          label="Coming next"
          variant="SECONDARY_NAV"
        />
        <Button onClick={onClick} linkTo="/#contact" label="Contact Us" />
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
