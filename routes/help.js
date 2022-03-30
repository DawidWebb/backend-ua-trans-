const express = require("express");
const { helpUser, handleMailForm } = require("../controllers/help");

const router = express.Router();

router.post("/", helpUser);
router.post("/form", handleMailForm);

router.use((request, response) => response.status(404).end());

module.exports = router;
