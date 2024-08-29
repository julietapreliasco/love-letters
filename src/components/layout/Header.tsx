'use client';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import { IoIosMenu } from 'react-icons/io';
import Menu from '../ui/Menu';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [headerTwo, setHeaderTwo] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const bannerElement = document.getElementById('initial-banner');
      const bannerHeight = bannerElement?.offsetHeight || 0;
      const bannerOffsetTop = bannerElement?.offsetTop || 0;
      const oneThirdBanner = bannerOffsetTop + bannerHeight / 2;
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > bannerHeight && currentScrollPos < lastScrollPos) {
        setHeaderTwo(true);
      } else if (currentScrollPos <= oneThirdBanner) {
        setHeaderTwo(false);
      }

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPos]);

  const headerClass = !headerTwo
    ? 'bg-transparent w-full absolute'
    : 'fixed w-[calc(100%-40px)] rounded-[10px] my-[10px] mx-[20px] bg-white bg-opacity-70 fixed';

  const logoClass = !headerTwo
    ? 'w-[104px] h-[30px] md:w-[208px] md:h-[60px] 2xl:w-[248px] 2xl:h-auto'
    : 'w-[104px] h-[30px] md:w-[138px] md:h-[40px] 2xl:w-[208px] 2xl:h-[80px]';

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <>
      <header
        className={`top-0 z-50 flex justify-between px-[20px] py-[20px] ${headerClass}`}
      >
        <Logo color={headerTwo ? '#29241F' : undefined} className={logoClass} />
        <div className="hidden items-center md:flex">
          <Button
            label="Projects"
            variant={!headerTwo ? 'PRIMARY_NAV' : 'SECONDARY_NAV'}
          />
          <Button
            label="About me"
            variant={!headerTwo ? 'PRIMARY_NAV' : 'SECONDARY_NAV'}
          />
          <Button
            label="Partners"
            variant={!headerTwo ? 'PRIMARY_NAV' : 'SECONDARY_NAV'}
          />
          <Button label="Join us" />
        </div>
        <div
          className={`items-center text-[24px] md:hidden ${
            !headerTwo ? 'text-white' : 'text-custom-black'
          }`}
        >
          <IoIosMenu onClick={toggleMenu} />
        </div>
      </header>

      {openMenu && <Menu onClick={toggleMenu} />}
    </>
  );
};

export default Header;
