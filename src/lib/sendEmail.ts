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
    from: 'paula@dandelion.software',
    subject: `New contact message from ${name}`,
    text: message,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending  email');
  }
};
