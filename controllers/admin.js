const Login = require("../models/login");
const mailer = require("../helpers/sendMail");
const mailerForm = require("../helpers/formMail");

exports.getUsers = (request, response, next) => {
  try {
    const findUser = Login.find();
    findUser.exec((err, data) => {
      response.status(200).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /getSubcontractor",
    });
  }
};

exports.handleMailFormUser = (req, res, next) => {
  try {
    const { userMail, userName, title, content, language } = req.body;

    if (language === "PL") {
      const propsUser = {
        title: `${userName}, zgłosiłeś temat pomocy - ${title}`,
        infoBeforeLink: `Twoje zgłoszenie zostanie rozpatrzone i otrzymasz odpowiedź na @${userMail} w ciągu 24 godzin.`,
        link: "",
        additionalInfo: `Treść: ${content}`,
        subject: "Formularz kontaktowy UATransport",
        mailTo: `${userMail}`,
      };
      mailer.mailSend(propsUser);
    } else {
      const propsUser = {
        title: `${userName}, ви повідомили про тему допомоги - ${title}`,
        infoBeforeLink: `Ваша заявка буде розглянута і ви отримаєте відповідь @${userMail} протягом 24 годин.`,
        link: "",
        additionalInfo: `Зміст: ${content}`,
        subject: "Контактна форма UATransport",
        mailTo: `${userMail}`,
      };
      mailer.mailSend(propsUser);
    }

    mailerForm.formMailSend(req.body);
    res.status(200).end();
  } catch (error) {
    res.status(500).json({
      error,
      message:
        "Przepraszamy błąd po stronie serwera, spróbuj za kilka minut / На жаль, помилка на стороні сервера, будь ласка, спробуйте за кілька хвилин.",
    });
  }
};
