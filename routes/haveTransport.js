const express = require("express");
const haveController = require("../controller/haveTransport");

const router = express.Router();

router.get("/", haveController.getComments);
router.get("/:id", haveController.getCommentsByUserId);
router.post("/", haveController.postComment);
router.put("/", haveController.editComment);
router.put("/del", haveController.delAllCommentsFromPost);
router.delete("/:id", haveController.delComment);

router.use((request, response) => response.status(404).end());

module.exports = router;
