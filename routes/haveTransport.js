const express = require("express");
const haveController = require("../controllers/haveTransport");

const router = express.Router();

router.get("/", haveController.getTransports);
// router.get("/:id", haveController.getCommentsByUserId);
router.post("/", haveController.postTransport);
router.put("/", haveController.editTransport);
router.delete("/:id", haveController.delTransport);

router.use((request, response) => response.status(404).end());

module.exports = router;
