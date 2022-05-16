const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const SEND_GRID_API = process.env.SEND_GRID_API;

exports.mailSend = (props) => {
  const { title, link, infoBeforeLink, additionalInfo, subject, mailTo } =
    props;

  const mailFrom = "ua.transport@developerweb.pl";

  const transport = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: `${SEND_GRID_API}`,
      },
    })
  );

  transport
    .sendMail({
      to: `${mailTo}`,
      from: `${mailFrom}`,
      subject: `${subject}`,
      html: `<html>\n  <head><h2>${title}</h2>\n</head>\n  <body>\n    <p>${infoBeforeLink}  <br/>\n </p>\n <a href="${link}">${link}</a>\n <p>${additionalInfo}</p>\n</body>\n</html>`,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
