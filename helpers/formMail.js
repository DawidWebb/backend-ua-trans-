const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const SEND_GRID_API = process.env.SEND_GRID_API;

exports.formMailSend = (props) => {
  const { userMail, userName, title, content, language } = props;

  const transport = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: `${SEND_GRID_API}`,
      },
    })
  );

  transport
    .sendMail({
      to: "ua.transport@developerweb.pl",
      from: "ua.transport@developerweb.pl",
      subject: `Formularz kontaktowy ze strony UaTransport`,
      html: `<p>Wiadomośc od: ${userName}, ${userMail}, JĘZYK : ${language}, temat: ${title} treść: ${content}</p>`,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
