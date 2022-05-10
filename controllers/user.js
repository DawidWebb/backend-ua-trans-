const { v4: uuid } = require("uuid");
const Login = require("../models/login");
const mailer = require("../helpers/sendMail");
const adminMailer = require("../helpers/adminMail");
const crypto = require("crypto");

// ADD NEW USER, ACESS IS SET ON USER AS DEFAUL

exports.addUser = (request, response, next) => {
  try {
    const { login, password, name, dateOfAdd, language, rodo, conditions } =
      request.body;

    const secret = "";
    const md5Hasher = crypto.createHmac("md5", secret);
    const hashPass = md5Hasher.update(password).digest("hex");

    Login.find({ login }, (err, data) => {
      if (data.length) {
        response.status(404).json({
          status: 404,
          message:
            language === "PL"
              ? "Podany adres eMail już istnieje w bazie danych"
              : "Наведена адреса електронної пошти вже існує в базі даних",
        });
      } else {
        new Login({
          login,
          hashPass,
          name,
          rodo: rodo,
          conditions: conditions,
          dateOfAdd,
          active: true,
        }).save();
        response.status(200).json({
          status: 200,
        });
        // HANDLE SEND EMAIL TO NEW USER
        // const props = {
        //   title: "Twoje konto zostało utworzone.",
        //   infoBeforeLink:
        //     "Towje konto jest nieaktywne, kliknij w poniższy link lub skopiuj go i wklej do przeglądarki, aby aktywować konto: ",
        //   link: `https://www.tslmanagement.pl/#/confirmation`,
        //   additionalInfo: "",
        //   subject: "Potwierdzenie założenia konta",
        //   mailTo: `${login}`,
        // };
        // mailer.mailSend(props);

        //SEND MAIL To ADMIN
        // const adminData = {
        //   mailFrom: `${login}`,
        //   content: "dodał konto",
        // };
        // adminMailer.adminInfo(adminData);
      }
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        language === "PL"
          ? "Przepraszamy błąd po stronie serwera, spróbuj za kilka minut."
          : "На жаль, помилка на стороні сервера, будь ласка, спробуйте за кілька хвилин.",
    });
  }
};

exports.confirmAdd = (request, response) => {
  try {
    const userLogin = request.params.userLogin;

    const findUser = Login.find({
      login: userLogin,
    });
    findUser.exec((err, data) => {
      if (data.length === 0 || data === null) {
        response.status(404).json({
          message: "Nie ma takiego adresu email w bazie",
        });
        return;
      }
      const filter = data[0]._id;
      const update = { active: true };
      Login.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
        if (err) {
          response.status(404).json({
            message: "coś poszło nie tak przy userAddActive",
          });
          return;
        }
        response.status(202).json({
          message:
            "Twoje konto zostało aktywowane, możesz przejść do panelu logowania - dziękujęmy.",
        });
        const adminData = {
          mailFrom: `${userLogin}`,
          content: "aktywował konto",
        };
        adminMailer.adminInfo(adminData);
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /confirmAdd",
    });
  }
};

exports.lostPassword = (request, response, next) => {
  try {
    const userLogin = request.params.login;
    const language = request.params.language;

    const findUser = Login.find({
      login: userLogin,
    });
    findUser.exec((err, data) => {
      if (data.length === 0 || data === null) {
        response.status(404).json({
          message:
            language === "PL"
              ? "Nie ma tekiego adresu eMail w bazie"
              : "У базі даних такої адреси електронної пошти немає",
        });
        return;
      }
      const filter = data[0]._id;
      const password = uuid().toString();
      const update = { password: password };

      Login.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
        if (err) {
          response.status(404).json({
            message:
              language === "PL"
                ? "Przepraszamy błąd po stronie serwera, spróbuj za kilka minut."
                : "На жаль, помилка на стороні сервера, будь ласка, спробуйте за кілька хвилин.",
          });
          return;
        }
        response.status(202).json({
          message: "Na podany adres eMail został wyałsany link do zmiany hasła",
        });
        const props = {
          title: language === "PL" ? "Hasło tymczasowe" : "Тимчасовий пароль",
          infoBeforeLink:
            language === "PL"
              ? "Poniżej Twoje hasło tymczasowe, jest ważne przez 12 godzin. Zmień hasło po zalogowaniu."
              : "Ваш тимчасовий пароль дійсний протягом 12 годин нижче. Змініть пароль після входу",
          link: "",
          additionalInfo: `${password}`,
          subject: language === "PL" ? "Zmiana hasła" : "Зміна пароля",
          mailTo: `${userLogin}`,
        };
        mailer.mailSend(props);
        const adminData = {
          mailFrom: `${userLogin}`,
          content: "resetuje hasło",
        };
        adminMailer.adminInfo(adminData);
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        language === "PL"
          ? "Przepraszamy błąd po stronie serwera, spróbuj za kilka minut."
          : "На жаль, помилка на стороні сервера, будь ласка, спробуйте за кілька хвилин.",
    });
  }
};

exports.getUser = (request, response, next) => {
  try {
    const userId = request.params.iserId;

    const findUser = Login.find({
      id: userId,
    });
    findUser.exec((err, data) => {
      if (data.length === 0 || data === null) {
        response.status(404).json({
          message: "Nie ma takiego loginu w bazie",
        });
        return;
      }
      response.status(200).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /getUser",
    });
  }
};

exports.getUsersLength = (request, response, next) => {
  try {
    const findUsers = Login.find();
    findUsers.exec((err, data) => {
      const users = data.length;
      response.status(200).json({
        users,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /getUsers",
    });
  }
};

exports.postUser = (request, response, next) => {
  try {
    const { login, password, language } = request.body;

    const secret = "";
    const md5Hasher = crypto.createHmac("md5", secret);
    const hash = md5Hasher.update(password).digest("hex");

    Login.find({ login }, (err, data) => {
      if (!data.length) {
        response.status(404).json({
          message:
            language === "PL"
              ? "Użytkownik o podanym loginie nie istnieje"
              : "Користувач із зазначеним логіном не існує",
        });
        return;
      } else if (!data[0].active) {
        response.status(404).json({
          message:
            language === "PL"
              ? `Użytkownik ${login} jest nie aktywny`
              : `Користувач ${login} неактивний`,
        });
      } else {
        if (data[0].hashPass !== hash.toString()) {
          response.status(404).json({
            message:
              language === "PL"
                ? `Login lub hasło się nie zgadza`
                : `Логін або пароль не збігаються`,
          });
          return;
        } else {
          const user = {
            id: data[0]._id,
            loginId: uuid(),
            user: data[0].login,
            access: "user",
            name: data[0].name,
            addDate: data[0].dateOfAdd,
          };
          response.status(200).json({
            user,
          });
        }
      }
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        language === "PL"
          ? "Przepraszamy błąd po stronie serwera, spróbuj za kilka minut."
          : "На жаль, помилка на стороні сервера, будь ласка, спробуйте за кілька хвилин.",
    });
  }
};

exports.changeUserPermission = (request, response, next) => {
  try {
    const { userId, login } = request.body;
    const filter = userId;
    const update = { access: "keyuser" };
    Login.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
      if (err) {
        response.status(404).json({
          message: "coś poszło nie tak przy changePermission",
        });
        return;
      }
      response.status(202).json({
        message: "uprawnienia użytkownika zmienine",
      });
      const props = {
        title: "Twoje uprawnienia zostały zmienione",
        infoBeforeLink: "Zostały nadane nowe uprawnienia: 'keyuser'.",
        link: "",
        additionalInfo: "Możesz teraz po zalogowaniu dodawać posty.",
        subject: "Zmiana uprawnień",
        mailTo: `${login}`,
      };
      mailer.mailSend(props);
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /changePermission",
    });
  }
};

exports.putUser = (request, response, next) => {
  try {
    const { id, password, language } = request.body;

    const secret = "";
    const md5Hasher = crypto.createHmac("md5", secret);
    const hashPass = md5Hasher.update(password).digest("hex");

    const filter = id;
    const update = { hashPass };

    Login.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
      if (err) {
        response.status(404).json({
          message:
            language === "PL"
              ? "Przepraszamy błąd po stronie serwera, spróbuj za kilka minut."
              : "На жаль, помилка на стороні сервера, будь ласка, спробуйте за кілька хвилин.",
        });
        return;
      }
      console.log(data);
      response.status(202).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        language === "PL"
          ? "Przepraszamy błąd po stronie serwera, spróbuj za kilka minut."
          : "На жаль, помилка на стороні сервера, будь ласка, спробуйте за кілька хвилин.",
    });
  }
};

exports.delUser = (request, response, next) => {
  try {
    const userId = request.params.id;
    const language = request.params.language;

    const findUser = Login.find({
      _id: userId,
    });
    findUser.exec((err, data) => {
      if (data.length === 0 || data === null) {
        response.status(404).json({
          message:
            language === "PL"
              ? "Nie ma takiego użytkownika w bazie"
              : "У базі даних такого користувача немає",
        });
        return;
        // } else if (data[0].password.toString() !== userPassword) {
        //   response.status(404).json({
        //     message: "Hasło nie poprawne",
        //   });
      } else {
        const filter = userId;
        const update = { active: false };
        Login.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
          if (err) {
            response.status(404).json({
              message:
                language === "PL"
                  ? "Przepraszamy błąd po stronie serwera, spróbuj za kilka minut."
                  : "На жаль, помилка на стороні сервера, будь ласка, спробуйте за кілька хвилин.",
            });
            return;
          }

          response.status(200).end();

          // const props = {
          //   title: "Właśnie usunołeś swoje konto z serwisu",
          //   infoBeforeLink: "Dziękujemy że z nami byłeś.",
          //   link: "",
          //   additionalInfo:
          //     "Twoje konto i dane które podałeś zostału usunięte, Twoje komentarze i posty pozostały w serwisie.",
          //   subject: "Usunięcie konta",
          //   mailTo: `${data.login}`,
          // };
          // mailer.mailSend(props);
          // const adminData = {
          //   mailFrom: `${data.login}`,
          //   content: "usunął konto",
          // };
          // adminMailer.adminInfo(adminData);
        });
      }
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        language === "PL"
          ? "Przepraszamy błąd po stronie serwera, spróbuj za kilka minut."
          : "На жаль, помилка на стороні сервера, будь ласка, спробуйте за кілька хвилин.",
    });
  }
};

exports.blockUserByAdmin = (request, response, next) => {
  try {
    const userId = request.params.userId;

    const filter = userId;
    const update = { active: false };
    Login.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
      if (err) {
        response.status(404).json({
          message: "coś poszło nie tak przy blockUserByAdmin",
        });
        return;
      }
      response.status(202).json({
        message: "użytkownik zablokowany",
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /blockUserByAdmin",
    });
  }
};
