const Login = require("../models/login");

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
