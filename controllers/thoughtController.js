import { Thought, User } from "../models/index.js";

const thoughtController = {
  getThoughts(req, res) {
    console.log("getThoughts");
    Thought.find({})
      .populate("reactions")
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate("reactions")
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createThought({ body }, res) {
    Thought.create(body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        !user
          ? res
              .status(404)
              .json({ message: "No user found with this username!" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $set: body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought found with this id!" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndRemove({ _id: params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id!" })
          : User.findOneAndUpdate(
              { thoughts: params.thoughtId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought found with this id!" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought found with this id!" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

export default thoughtController;
