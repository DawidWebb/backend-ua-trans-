const Needs = require("../models/needs");

exports.getNeeds = (request, response, next) => {
  try {
    const findNeeds = Needs.find();
    findNeeds.exec((err, data) => {
      response.status(200).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /getPosts",
    });
  }
};

exports.postNeeds = (request, response, next) => {
  try {
    const body = request.body;
    const newTransport = new Needs(body);

    newTransport.save((err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      response.status(201).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /post/add",
    });
  }
};

// edit and change data of Post
exports.editNeeds = (request, response, next) => {
  try {
    const {
      transportId,
      userId,
      loadCity,
      delCity,
      startDate,
      endDate,
      kindOfTruck,
      weight,
      package,
      quanity,
      describe,
      contact,
      kindOfTransport,
    } = request.body;

    const filter = transportId;
    const update = {
      userId,
      loadCity,
      delCity,
      startDate,
      endDate,
      kindOfTruck,
      weight,
      package,
      quanity,
      describe,
      contact,
      kindOfTransport,
    };

    Needs.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
      if (err) {
        response.status(404).json({
          message: "brak danych do edycji",
        });
        return;
      }
      response.status(202).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /need-transport",
    });
  }
};

// delete post
exports.delNeeds = (request, response, next) => {
  try {
    Needs.findByIdAndDelete(request.params.id, (err) => {
      if (err) {
        response.status(404).json({
          message: "Nie ma informacji do usunięcia",
        });
        return;
      }
      response.status(200).end();
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /haveTransports/:id",
    });
  }
};
