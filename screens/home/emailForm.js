import React from 'react';
import nodemailer from 'nodemailer';

const EmailSender = () => {
  const sendEmail = () => {
    // Create a transporter using the email configuration
    
    const emailConfig = {
      host: 'your_smtp_host',
      port: your_smtp_port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'your_username',
        pass: 'your_password'
      }
    };

    const transporter = nodemailer.createTransport(emailConfig);

    // Define the email message options
    const mailOptions = {
      from: 'your_email@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'This is a test email sent from my React Native app!'
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };

  return (
    <div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default EmailSender;
