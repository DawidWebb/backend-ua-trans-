const express = require("express");
const {
  addUser,
  blockUserByAdmin,
  changeUserPermission,
  delUser,
  getUser,
  postUser,
  putUser,
  confirmAdd,
  lostPassword,
  putUserComments,
  getUsersLength,
} = require("../controllers/user");

const router = express.Router();

router.post("/", postUser);
router.post("/add", addUser);
router.post("/permission", changeUserPermission);
router.get("/", getUsersLength);
router.get("/confirm/:userLogin", confirmAdd);
router.get("/lost-password/:userLogin", lostPassword);
router.get("/block/:userId", blockUserByAdmin);
router.get("/:userId", getUser);
router.put("/", putUser);
router.delete("/:id.:password", delUser);
router.use((request, response) => response.status(404).end());

module.exports = router;
