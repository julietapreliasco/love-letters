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
    <div className="flex flex-col-reverse items-center gap-3 rounded-[10px] bg-custom-lighter-gray p-10 md:flex-row md:gap-0">
      <div className="flex w-full flex-col gap-5">
        <p className="justify font-futura text-lg font-semibold leading-normal tracking-wider lg:text-3xl lg:leading-normal">
          {customTitle ?? 'Ready to bring love letters to your city?'}
        </p>
        <p className="mb-2 text-sm leading-normal lg:text-base lg:leading-normal">
          {customDescription ??
            'Join our mission to spread love! Share your story, sponsor, or bring us to your city. We are excited to collaborate!'}
        </p>
        <Button label={customLabel ?? 'Join us'} linkTo="/#contact" />
      </div>
      <div className="w-3/4">
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
