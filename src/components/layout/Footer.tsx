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
      <div className="flex flex-col items-center justify-between gap-10 border-b border-custom-black pb-5 md:flex-row">
        <FooterLogo className="h-auto w-[189px]" />
        <p className="max-w-[480px] self-center text-center font-futura text-lg leading-normal tracking-wider text-custom-black md:max-w-[680px] lg:text-xl lg:leading-normal 2xl:text-2xl 2xl:leading-normal">
          {data?.description}
        </p>
        <div className="flex flex-col gap-[10px] md:self-center">
          <span className="mr-4 text-center font-lato md:text-start lg:text-xl">
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
      <div className="flex flex-col items-center justify-between pt-5 xl:flex-row-reverse">
        <div className="flex flex-col items-center pb-5 md:flex-row md:p-0">
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
        <span className="w-full border-t border-custom-black pb-[10px] pt-10 text-center md:hidden">
          Copyright &copy; 2024. All rights reserved.
        </span>
        <span className="mt-8 hidden self-center md:block md:text-sm xl:mt-0 xl:text-base">
          Copyright &copy; 2024. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
