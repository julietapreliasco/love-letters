import Button from './Button';
import LottieAnimation from './LottieAnimation';
import animationData from '../../../public/animation-2.json';

interface ContactUsCardProps {
  customTitle?: string;
  customDescription?: string;
  customLabel?: string;
}
const ContactUsCard = ({
  customTitle,
  customDescription,
  customLabel,
}: ContactUsCardProps) => {
  return (
    <div className="flex w-full flex-col-reverse items-center justify-around gap-3 rounded-[10px] bg-custom-lighter-gray px-6 py-10 md:flex-row md:gap-0 md:px-10 lg:py-5">
      <div className="flex w-full flex-col items-center gap-5 md:items-start">
        <p className="justify text-center font-futura text-lg font-semibold leading-normal tracking-wider md:text-start md:text-2xl md:leading-normal lg:text-3xl lg:leading-normal">
          {customTitle ?? 'Ready to bring love letters to your city?'}
        </p>
        <p className="mb-2 text-center text-sm leading-normal md:text-start md:text-base md:leading-normal lg:text-base lg:leading-normal">
          {customDescription ??
            'Join our mission to spread love! Share your story, sponsor, or bring us to your city. We are excited to collaborate!'}
        </p>
        <Button label={customLabel ?? 'Contact Us Here'} linkTo="/#contact" />
      </div>
      <div className="w-[60%] self-center md:w-3/4">
        <LottieAnimation
          autoplay={true}
          hover={false}
          animationData={animationData}
        />
      </div>
    </div>
  );
};

export default ContactUsCard;
