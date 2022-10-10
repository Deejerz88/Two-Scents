import { User, Thought } from "../models/index.js";
import { Types } from "mongoose";

const userController = {
  getUsers(req, res) {
    console.log("getUsers");
    User.find({})
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    console.log("body", body);
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this id!" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User & associated thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  addFriend({ params }, res) {
    const friendId = Types.ObjectId(params.friendId);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: friendId } },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend({ params }, res) {
    console.log('params', params);
    const friendId = Types.ObjectId(params.friendId);
    console.log('friendId', friendId);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: friendId } },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};

export default userController;
