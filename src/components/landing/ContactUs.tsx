import { LandingSectionType } from '@/contentful/landingSections';
import ContactForm from '../ui/ContactForm';
import animationData from '../../../public/animation-2.json';
import LottieAnimation from '../ui/LottieAnimation';

interface ContactUsProps {
  contactUsData: LandingSectionType;
}

const ContactUs: React.FC<ContactUsProps> = ({ contactUsData }) => {
  return (
    <div
      id="contact"
      className="my-5 flex flex-col bg-custom-lighter-gray px-9 py-[60px] md:my-10 md:flex-row md:items-center md:p-0"
    >
      <div className="md:mx-[70px] lg:mx-[100px] 2xl:mx-[156px]">
        <LottieAnimation
          autoplay={true}
          hover={false}
          animationData={animationData}
        />
      </div>
      <div className="flex flex-col gap-5 text-[16px] text-custom-black md:py-[2.5rem] md:pr-[3.75rem] md:text-base">
        <span className="font-futura text-3xl leading-normal md:text-4xl md:leading-normal">
          {contactUsData.title}
        </span>
        <p className="font-lato leading-normal">{contactUsData.description}</p>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;
