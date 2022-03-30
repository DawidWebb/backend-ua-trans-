const transportSchema = require("../models/transport");
const fileUpload = require("../helpers/fileUploader");
const fs = require("fs");
// get all posts from DB
exports.getPosts = (request, response, next) => {
  try {
    const findSPosts = postSchema.find();
    findSPosts.exec((err, data) => {
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

// // add post to DB
exports.postPost = (request, res, next) => {
  try {
    const { id, title, content, link, user, userName, date, imgPath } =
      request.body;
    const body = {
      id: id,
      title: title,
      content: content,
      link: link,
      user: user,
      userName: userName,
      date: date,
      imgPath: imgPath,
    };
    const newPost = new postSchema(body);
    newPost.save((err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({
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
