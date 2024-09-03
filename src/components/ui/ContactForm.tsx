'use client';

import { useState } from 'react';
import Button from './Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({
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

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let error = '';

    if (name === 'name') {
      if (value.length < 3 || value.length > 50) {
        error = 'Name must be between 3 and 50 characters long.';
      }
    } else if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        error = 'Invalid email address.';
      }
    } else if (name === 'message') {
      if (value.length < 10 || value.length > 1000) {
        error = 'Message must be between 10 and 1000 characters long.';
      }
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== '')) {
      setErrorMessage('Please correct the highlighted errors.');
      return;
    }

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
        setErrorMessage('');
        setErrors({ name: '', email: '', message: '' });
      } else {
        setErrorMessage('Error sending message.');
      }
    } catch (error) {
      setErrorMessage('Error sending message.');
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
        onBlur={handleBlur}
        required
        className="w-full rounded border border-custom-gray p-2"
      />
      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        className="w-full rounded border border-custom-gray p-2"
      />
      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

      <textarea
        name="message"
        placeholder="Please share your vision or description of your project."
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        className="h-[160px] w-full rounded border border-custom-gray p-2"
      />
      {errors.message && (
        <p className="text-sm text-red-500">{errors.message}</p>
      )}

      <Button
        className="mt-5 h-full w-full"
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
