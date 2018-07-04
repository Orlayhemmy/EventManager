import nodemailer from 'nodemailer';
import generateShortCode from './generateCode';

/**
 * @param  {object} req
 * @param {object} res
 * @returns {object} success or failure message
 */
export default function sendMail(req, res) {
  const { email, message, title } = req.body;
  let shortCode;
  let codeTitle;
  let codeMessage;
  if (!message) {
    shortCode = generateShortCode();
    codeMessage = `This code expires in 5 minutes <br/> code:
    <b> ${shortCode} </b>`;
    codeTitle = 'Password Reset Code';
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ecenter.2017.andela@gmail.com',
      pass: 'qwerty001?'
    }
  });
  const mailOptions = {
    from: 'ecenter.2017.andela@gmail.com',
    to: email,
    subject: title || codeTitle,

    html: message || codeMessage
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return (error, info);
    }
    return res.status(201).send({
      message: 'Mail sent',
      shortCode
    });
  });
}
