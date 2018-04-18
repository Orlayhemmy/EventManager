import nodemailer from 'nodemailer';

/**
 * @param  {object} req
 * @param {object} res
 * @returns {object} success or failure message
 */
export default function sendMail(req, res) {
  const {
    email,
    message,
    title,
  } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'daminomics@gmail.com',
      pass: 'profyem001',
    },
  });

  const mailOptions = {
    from: 'daminomics@gmail.com',
    to: email,
    subject: title,

    html: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return (error, info);
    }
    return res.status(201).send({
      message: 'Mail sent',
    });
  });
}
