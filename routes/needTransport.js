const express = require("express");
const cors = require("cors");
const needController = require("../controllers/needTransport");

const router = express.Router();
router.use(cors());

router.get("/", cors(), needController.getPosts);
// router.get("/:search.:item", needController.postPost);
router.post("/upload", cors(), needController.addFile);
router.put("/", cors(), needController.putPost);
router.delete("/:id", cors(), needController.deletePost);

router.use((request, response) => response.status(404).end());

module.exports = router;
