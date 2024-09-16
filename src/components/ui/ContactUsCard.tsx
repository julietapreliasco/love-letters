'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from './Button';

const ContactUsCard = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleButtonClick = () => {
    if (isClient) {
      router.push('/#contact');
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded bg-custom-lighter-gray p-10 md:w-2/3 lg:m-5 lg:w-1/2">
      <p className="justify font-playfair-display text-lg font-semibold lg:text-3xl">
        Ready to bring love letters to your city?
      </p>
      <p className="mb-2 text-sm lg:text-base">
        Join our mission to spread love! Share your story, sponsor, or bring us
        to your city—we’re excited to collaborate!
      </p>
      <Button label="Join us" onClick={handleButtonClick} />
    </div>
  );
};

export default ContactUsCard;
