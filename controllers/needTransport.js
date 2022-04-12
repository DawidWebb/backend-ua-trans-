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

exports.addFile = (request, response, next) => {
  try {
    const file = request.files.file;

    file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
      if (err) {
        return response.status(500).json({
          err,
          message:
            "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /fileUpload",
        });
      } else {
        // fileUpload.uploadFile(file.name);

        return response.status(201).json({
          fileName: file.name,
        });
      }
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /fileUpload",
    });
  }
};

// edit and change data of Post
exports.putPost = (request, response, next) => {
  try {
    const { id, title, content, link, user, userName, date } = request.body;

    const filter = id;
    const update = {
      title,
      content,
      link,
      user,
      userName,
      date,
    };

    postSchema.findByIdAndUpdate(filter, update, { new: true }, (err, data) => {
      if (err) {
        response.status(404).json({
          message: "brak postu do edycji",
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
        "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /posts",
    });
  }
};

// delete post
exports.deletePost = (request, response, next) => {
  try {
    postSchema.findByIdAndDelete(request.params.id, (err) => {
      if (err) {
        response.status(404).json({
          message: "Nie ma postu do usunięcia",
        });
        return;
      }
      response.status(200).end();
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /posts/:id",
    });
  }
};
