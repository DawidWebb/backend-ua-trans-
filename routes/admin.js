const express = require("express");
const { getUsers, handleMailFormUser } = require("../controllers/admin");

const router = express.Router();

router.post("/form", handleMailFormUser);
// router.post("/add", addUser);
// router.put("/", putUser);
router.get("/", getUsers);
// router.get("/:userId", getUser);
// router.delete("/:id.:password", delUser);
router.use((request, response) => response.status(404).end());

module.exports = router;
