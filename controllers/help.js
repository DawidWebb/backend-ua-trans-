const mailer = require("../helpers/sendMail");
const mailerForm = require("../helpers/formMail");

exports.helpUser = (request, response, next) => {
  try {
    const { userMail, title, info } = request.body;

    // HANDLE SEND EMAIL TO USER
    const propsUser = {
      title: `Zgłosiłeś temat pomocy: ${title}`,
      infoBeforeLink: `Twoje zgłosze nie zostanie rozpatrzone i otrzymasz odpowiuedź na @${userMail} w ciągu 24 godzin.`,
      link: "",
      additionalInfo: `Treść: ${info}`,
      subject: "Pomoc TarnsportBlog",
      mailTo: `${userMail}`,
    };
    const propsAdmin = {
      title: `Użytkownik: ${userMail}`,
      infoBeforeLink: `Temat: ${title} `,
      link: "",
      additionalInfo: `Treść: ${info}`,
      subject: "Zgłoszenie pomocy od użytkownika",
      mailTo: "tomasz.matras@developerweb.pl",
    };
    mailer.mailSend(propsUser);
    mailer.mailSend(propsAdmin);

    response.status(200).json({
      message: "Twoje zgłoszenie zostało wysałne.",
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: "Coś poszło nie tak, przy metodzie POST w endpointcie /helpUser",
    });
  }
};

exports.handleMailForm = (request, response, next) => {
  try {
    const { mail, name, content } = request.body;

    const propsAdmin = {
      mailFrom: mail,
      name: name,
      content: content,
    };

    mailerForm.formMailSend(propsAdmin);

    response.status(200).json({
      message: "Twoje zgłoszenie zostało wysałne.",
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: "Coś poszło nie tak, przy metodzie POST w endpointcie /helpUser",
    });
  }
};
