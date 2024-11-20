import { fetchFooter } from '@/contentful/footer';
import FooterLogo from '../ui/FooterLogo';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import Button from '../ui/Button';

const Footer = async () => {
  const data = await fetchFooter({ preview: false });

  const iconMap: { [key: string]: JSX.Element } = {
    Instagram: <FaInstagram className="text-2xl" />,
    Youtube: <FaYoutube className="text-2xl" />,
    Facebook: <FaFacebook className="text-2xl" />,
    LinkedIn: <FaLinkedin className="text-2xl" />,
  };

  return (
    <footer className="w-full bg-custom-lighter-gray px-[35px] py-[46px] md:px-[60px] md:py-[46px]">
      <div className="flex flex-col items-center justify-between gap-10 border-b border-custom-black pb-10 md:flex-row">
        <FooterLogo className="h-auto w-[189px]" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:items-center lg:flex lg:flex-row">
          <Button label="Places" linkTo="/places" variant={'SECONDARY_NAV'} />
          <Button
            label="Partners"
            linkTo="/partners"
            variant={'SECONDARY_NAV'}
          />
          <Button label="Press" linkTo="/press" variant={'SECONDARY_NAV'} />
          <Button label="Academy" linkTo="/academy" variant={'SECONDARY_NAV'} />
          <Button label="About" linkTo="/about-me" variant={'SECONDARY_NAV'} />
          <Button
            label="Speaking"
            linkTo="/speaking"
            variant={'SECONDARY_NAV'}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-11 pt-8 md:flex-row">
        <div>
          <span className="w-full pb-[10px] pt-10 text-center md:hidden">
            Copyright &copy; 2024. All rights reserved.
          </span>
          <span className="mt-8 hidden self-center md:block md:text-sm xl:mt-0 xl:text-base">
            Copyright &copy; 2024. All rights reserved.
          </span>
        </div>
        <div className="flex flex-col gap-[10px] md:self-center">
          <span className="text-center font-lato md:text-start lg:text-xl">
            Follow us:
          </span>
          <div className="flex space-x-4">
            {data?.socialMedia?.map((social, index) => {
              const IconComponent = iconMap[social.name];
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="hover:text-custom-black-dark text-custom-black"
                >
                  {IconComponent}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
