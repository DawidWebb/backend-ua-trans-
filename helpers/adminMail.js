const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const SEND_GRID_API = process.env.SEND_GRID_API;

exports.adminInfo = (adminData) => {
  const { mailFrom, content } = adminData;

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
      subject: `Użytkownik ${content}`,
      html: `<p>Użytkownik: ${mailFrom} - ${content}</p>`,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
