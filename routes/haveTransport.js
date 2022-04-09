const express = require("express");
const haveController = require("../controllers/haveTransport");

const router = express.Router();

router.get("/", haveController.getTransports);
router.get("/:id", haveController.getCommentsByUserId);
router.post("/", haveController.postTransport);
router.put("/", haveController.editComment);
router.put("/del", haveController.delAllCommentsFromPost);
router.delete("/:id", haveController.delComment);

router.use((request, response) => response.status(404).end());

module.exports = router;
