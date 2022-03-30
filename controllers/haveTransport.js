const transportSchema = require("../models/transport");

exports.getComments = (request, response, next) => {
  try {
    const findECommnts = commentSchema.find();
    findECommnts.exec((err, data) => {
      response.status(200).json({
        data,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /getComments",
    });
  }
};

exports.getCommentsByUserId = (request, response, next) => {
  const userId = request.params.id;

  try {
    const userComments = [];
    const findECommnts = commentSchema.find();
    findECommnts.exec((err, data) => {
      data.map((item) => {
        if (item.userId === userId) {
          userComments.push(item);
        }
      });
      response.status(200).json({
        userComments,
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /getComments",
    });
  }
};

exports.postComment = (request, response, next) => {
  try {
    const body = request.body;
    const newComment = new commentSchema(body);

    newComment.save((err, data) => {
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

exports.editComment = (request, response, next) => {
  try {
    const { commentId, content } = request.body;

    const filter = commentId;
    const update = {
      content,
    };

    commentSchema.findByIdAndUpdate(
      filter,
      update,
      { new: true },
      (err, data) => {
        if (err) {
          response.status(404).json({
            message: "brak komentarza do edycji",
          });
          return;
        }
        response.status(202).json({
          data,
        });
      }
    );
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /comments",
    });
  }
};

exports.delComment = (request, response, next) => {
  try {
    commentSchema.findByIdAndDelete(request.params.id, (err) => {
      if (err) {
        response.status(404).json({
          message: "Nie ma komentarza do usunięcia",
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

exports.delAllCommentsFromPost = (request, response, next) => {
  try {
    const commentsIds = request.body;
    commentsIds.data.forEach((item) => {
      commentSchema.findByIdAndDelete(item, (err) => {
        if (err) {
          response.status(404).json({
            message: "Nie ma komentarza do usunięcia",
          });
          return;
        }
        response.status(200).end();
      });
    });
  } catch (error) {
    response.status(500).json({
      error,
      message:
        "Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /posts/:id",
    });
  }
};
