const Transport = require("../models/transport");

exports.getTransports = (request, response, next) => {
  try {
    const findTransports = Transport.find();
    findTransports.exec((err, data) => {
      response.status(200).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /getTransports",
    });
  }
};

// exports.getCommentsByUserId = (request, response, next) => {
//   const userId = request.params.id;

//   try {
//     const userComments = [];
//     const findECommnts = commentSchema.find();
//     findECommnts.exec((err, data) => {
//       data.map((item) => {
//         if (item.userId === userId) {
//           userComments.push(item);
//         }
//       });
//       response.status(200).json({
//         userComments,
//       });
//     });
//   } catch (error) {
//     response.status(500).json({
//       error,
//       message:
//         "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /getComments",
//     });
//   }
// };

exports.postTransport = (request, response, next) => {
  try {
    const body = request.body;
    const newTransport = new Transport(body);

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

exports.editTransport = (request, response, next) => {
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

    Transport.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
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
        "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /have-transport",
    });
  }
};

exports.delTransport = (request, response, next) => {
  try {
    Transport.findByIdAndDelete(request.params.id, (err) => {
      if (err) {
        response.status(404).json({
          message: "Nie ma transportu do usunięcia",
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
