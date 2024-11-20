import { fetchFooter } from '@/contentful/footer';
import FooterLogo from '../ui/Logo';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = async () => {
  const data = await fetchFooter({ preview: false });

  const iconMap: { [key: string]: JSX.Element } = {
    Instagram: <FaInstagram className="text-3xl" />,
    Youtube: <FaYoutube className="text-3xl" />,
    Facebook: <FaFacebook className="text-3xl" />,
    LinkedIn: <FaLinkedin className="text-3xl" />,
  };

  return (
    <footer className="w-full bg-custom-lighter-gray px-[35px] py-9 md:px-[60px]">
      <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
        <FooterLogo color="#29241F" className="h-auto w-[189px]" />

        <div className="flex flex-col gap-[10px] md:self-center">
          <div className="flex space-x-8">
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
        <div className="flex flex-col gap-1">
          <span className="self-center md:text-sm xl:mt-0 xl:text-base">
            Copyright &copy; 2024
          </span>
          <a
            href="https://mimisoft.com/"
            className="self-center md:text-sm xl:mt-0 xl:text-base"
          >
            Powered by Mimisoft
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
