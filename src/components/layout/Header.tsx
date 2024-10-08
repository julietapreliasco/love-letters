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
  const [header, setHeader] = useState(false);
  const [whiteText, setWhiteText] = useState(false);
  const headerControls = useAnimation();

  const pathname = usePathname();
  const shouldShowHeader =
    pathname === '/places' ||
    pathname === '/press' ||
    pathname === '/partners' ||
    pathname === '/about-me';

  const isAboutPage = pathname === '/about-me';

  useEffect(() => {
    const handleScroll = () => {
      const bannerElement = document.getElementById('initial-banner');
      const bannerHeight = bannerElement?.offsetHeight || 0;
      const currentScrollPos = window.scrollY;

      if (isAboutPage) {
        if (currentScrollPos <= bannerHeight / 2) {
          setWhiteText(true);
        } else {
          setWhiteText(false);
        }
      } else {
        setWhiteText(false);
      }

      if (shouldShowHeader) {
        setHeader(true);
      } else {
        if (currentScrollPos > bannerHeight) {
          setHeader(true);
        } else if (currentScrollPos <= bannerHeight / 2) {
          setHeader(false);
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      setHeader(false);
      setWhiteText(false);
    };
  }, [shouldShowHeader, isAboutPage]);

  useEffect(() => {
    headerControls.start({
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' },
    });
  }, [headerControls]);

  const headerClass =
    !header && !shouldShowHeader
      ? 'hidden'
      : `fixed w-[calc(100%-40px)] rounded-[10px] my-[10px] mx-[20px] ${
          whiteText ? '' : 'bg-white bg-opacity-70  backdrop-blur-sm'
        } `;

  const logoClass =
    !header && !shouldShowHeader
      ? 'hidden'
      : 'w-[104px] h-[30px] md:w-[138px] md:h-[40px] ';

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <>
      <motion.header
        className={`top-0 z-50 flex justify-between px-[20px] py-[10px] ${headerClass}`}
        initial={{ opacity: 0 }}
        animate={headerControls}
      >
        <Link href="/">
          <Logo color={whiteText ? '#FFF' : '#29241F'} className={logoClass} />
        </Link>
        <div className="hidden items-center md:flex">
          <Button
            label="Places"
            variant={whiteText ? 'PRIMARY_NAV' : 'SECONDARY_NAV'}
            linkTo="/places"
          />
          <Button
            label="Partners"
            linkTo="/partners"
            variant={whiteText ? 'PRIMARY_NAV' : 'SECONDARY_NAV'}
          />
          <Button
            label="Press"
            linkTo="/press"
            variant={whiteText ? 'PRIMARY_NAV' : 'SECONDARY_NAV'}
          />
          <Button
            linkTo="/about-me"
            label="About"
            variant={whiteText ? 'PRIMARY_NAV' : 'SECONDARY_NAV'}
          />
          <Button linkTo="/#contact" label="Join us" />
        </div>
        <div
          className={`items-center text-[24px] ${whiteText ? 'text-white' : 'text-custom-black'} md:hidden`}
        >
          <IoIosMenu onClick={toggleMenu} />
        </div>
      </motion.header>

      {openMenu && <Menu onClick={toggleMenu} />}
    </>
  );
};

export default Header;
