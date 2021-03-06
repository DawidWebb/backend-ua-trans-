const express = require("express");
const cors = require("cors");
const needController = require("../controllers/needTransport");

const router = express.Router();
router.use(cors());

router.get("/", cors(), needController.getNeeds);
router.post("/", cors(), needController.postNeeds);
router.put("/", cors(), needController.editNeeds);
router.delete("/:id", cors(), needController.delNeeds);

router.use((request, response) => response.status(404).end());

module.exports = router;
