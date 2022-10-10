import express from "express";
import { userController } from "../../controllers/index.js";

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = userController;

const router = express.Router();

router
  .route("/")
  .get((req, res) => getUsers(req, res))
  .post((req, res) => createUser(req, res));

router
  .route("/:userId")
  .get((req, res) => getUserById(req, res))
  .put((req, res) => updateUser(req, res))
  .delete((req, res) => deleteUser(req, res));

router
  .route("/:userId/friends/:friendId")
  .post((req, res) => addFriend(req, res))
  .delete((req, res) => removeFriend(req, res));

export default router;
