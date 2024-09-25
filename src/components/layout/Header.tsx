'use client';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import { IoIosMenu } from 'react-icons/io';
import Menu from '../ui/Menu';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [headerTwo, setHeaderTwo] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const headerControls = useAnimation();

  const pathname = usePathname();
  const blackText = pathname === '/campaigns';

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

  useEffect(() => {
    headerControls.start({
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' },
    });
  }, [headerControls]);

  const headerClass = !headerTwo
    ? 'bg-transparent w-full absolute'
    : 'fixed w-[calc(100%-40px)] rounded-[10px] my-[10px] mx-[20px] bg-white bg-opacity-70 backdrop-blur-sm';

  const logoClass = !headerTwo
    ? 'w-[104px] h-[30px] md:w-[208px] md:h-[60px] '
    : 'w-[104px] h-[30px] md:w-[138px] md:h-[40px] ';

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <>
      <motion.header
        className={`top-0 z-50 flex justify-between px-[20px] py-[20px] ${headerClass}`}
        initial={{ opacity: 0 }}
        animate={headerControls}
      >
        <Link href="/">
          <Logo
            color={headerTwo || blackText ? '#29241F' : undefined}
            className={logoClass}
          />
        </Link>
        <div className="hidden items-center md:flex">
          <Button
            label="Campaigns"
            variant={headerTwo || blackText ? 'SECONDARY_NAV' : 'PRIMARY_NAV'}
            linkTo="/campaigns"
          />
          <Button
            linkTo="/about-me"
            label="About"
            variant={headerTwo || blackText ? 'SECONDARY_NAV' : 'PRIMARY_NAV'}
          />
          <Button
            label="Partners"
            linkTo="/#partners"
            variant={headerTwo || blackText ? 'SECONDARY_NAV' : 'PRIMARY_NAV'}
          />
          <Button linkTo="/#contact" label="Join us" />
        </div>
        <div
          className={`items-center text-[24px] md:hidden ${
            headerTwo || blackText ? 'text-custom-black' : 'text-white'
          }`}
        >
          <IoIosMenu onClick={toggleMenu} />
        </div>
      </motion.header>

      {openMenu && <Menu onClick={toggleMenu} />}
    </>
  );
};

export default Header;
