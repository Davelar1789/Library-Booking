const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const generateVerificationCode = () => Math.floor(1000 + Math.random() * 9000);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

let verificationCodes = {};

exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const code = generateVerificationCode();
    verificationCodes[email] = code;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify Your Email',
      text: `Your verification code is: ${code}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification code sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send verification code', error });
  }
};

exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    // Check if the code matches
    if (verificationCodes[email] && verificationCodes[email].toString() === code) {
      // Delete the code from the temporary storage
      delete verificationCodes[email];

      // Update the isVerified field in the database
      const user = await User.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true } // Return the updated document
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Email verified successfully', user });
    } else {
      res.status(400).json({ message: 'Invalid or expired code' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during verification', error });
  }
};


