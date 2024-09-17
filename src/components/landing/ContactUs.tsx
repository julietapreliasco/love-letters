import { LandingSectionType } from '@/contentful/landingSections';
import ContactForm from '../ui/ContactForm';
import dynamic from 'next/dynamic';
import animationData from '../../../public/animation-2.json';

interface ContactUsProps {
  contactUsData: LandingSectionType;
}

const LottieAnimation = dynamic(() => import('../ui/LottieAnimation'), {
  ssr: false,
});

const ContactUs: React.FC<ContactUsProps> = ({ contactUsData }) => {
  return (
    <div
      id="contact"
      className="flex flex-col bg-custom-lighter-gray px-9 py-[60px] md:flex-row md:items-center md:p-0"
    >
      <div className="md:mx-[70px] lg:mx-[100px] 2xl:mx-[156px]">
        <LottieAnimation animationData={animationData} />
      </div>
      <div className="flex flex-col gap-5 text-[16px] text-custom-black md:py-[2.5rem] md:pr-[3.75rem] md:text-base">
        <span className="font-playfair-display text-3xl font-semibold md:text-4xl">
          {contactUsData.title}
        </span>
        <p className="font-lato">{contactUsData.description}</p>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;
