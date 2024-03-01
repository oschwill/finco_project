import nodemailer from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  text: string;
  html: string;
}

export const sendDynamicEmail = async (options: EmailOptions): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: 'mailtrap Test" <Admin@finco.com>',
    to: options.email,
    subject: options.subject,
    text: options.text, // plain text body
    html: options.html, // html body
  });

  console.log('Message sent: %s', info.messageId);

  return true;
};
