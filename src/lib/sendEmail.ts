import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface EmailData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async ({ name, email, message }: EmailData) => {
  const msg = {
    to: 'connect@brianrashid.com',
    from: 'julieta@mimisoft.com',
    subject: `New contact message from ${name}`,
    templateId: 'd-d97b97b73be64e2186078a0667d1ae39',
    dynamicTemplateData: {
      name,
      email,
      message,
    },
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending  email');
  }
};
