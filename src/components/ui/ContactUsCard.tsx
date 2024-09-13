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
    <div className="m-5 flex w-1/2 flex-col gap-5 rounded bg-custom-lighter-gray p-10">
      <p className="justify font-playfair-display text-3xl font-semibold">
        Ready to bring love letters to your city?
      </p>
      <p className="mb-2 text-base">
        Join our mission to spread love! Share your story, sponsor, or bring us
        to your city—we’re excited to collaborate!
      </p>
      <Button label="Join us" onClick={handleButtonClick} />
    </div>
  );
};

export default ContactUsCard;
