const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const SEND_GRID_API = process.env.SEND_GRID_API;

exports.formMailSend = (props) => {
  const { mailFrom, name, content } = props;

  const transport = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: `${SEND_GRID_API}`,
      },
    })
  );

  transport
    .sendMail({
      to: "blog@tslmanagement.pl",
      from: "blog@tslmanagement.pl",
      subject: `Formularz kontaktowy ze strony TransportBlog`,
      html: `<p>Wiadomośc od: ${name}, ${mailFrom} treść: ${content}</p>`,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
