'use client';

import { useState } from 'react';
import Button from './Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Message sent!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMessage('Error sending message');
      }
    } catch (error) {
      setErrorMessage('Error sending message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <input
        type="text"
        name="name"
        placeholder="Name / Institution"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full rounded border border-custom-gray p-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full rounded border border-custom-gray p-2"
      />
      <textarea
        name="message"
        placeholder="Please share your vision or description of your project."
        value={formData.message}
        onChange={handleChange}
        required
        className="mb-5 h-[160px] w-full rounded border border-custom-gray p-2"
      />
      <Button
        className="h-full w-full"
        type="submit"
        disabled={isLoading}
        label={isLoading ? 'Sending...' : 'Send →'}
      />
      {successMessage && (
        <p className="self-center text-custom-black">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="self-center text-red-500">{errorMessage}</p>
      )}
    </form>
  );
};

export default ContactForm;
