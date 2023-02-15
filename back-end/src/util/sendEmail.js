var nodemailer = require('nodemailer');

export const sendEmail = ({ to, from, subject, text }) => {
    const msg = { to, from, subject, text };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'react.class.test@gmail.com',
          pass: 'tkulyowcadsaoigh'
        }
      });
      
      var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    return msg;
}