import Button from './Button';

const ContactUsCard = () => {
  return (
    <div className="flex w-full flex-col gap-5 rounded-[10px] bg-custom-lighter-gray p-10">
      <p className="justify font-futura text-lg font-semibold leading-normal tracking-wider lg:text-3xl lg:leading-normal">
        Ready to bring love letters to your city?
      </p>
      <p className="mb-2 text-sm leading-normal lg:text-base lg:leading-normal">
        Join our mission to spread love! Share your story, sponsor, or bring us
        to your city—we’re excited to collaborate!
      </p>
      <Button label="Join us" linkTo="/#contact" />
    </div>
  );
};

export default ContactUsCard;
