import express from "express";
import thoughtController from "../../controllers/thoughtController.js";

const router = express.Router();
const { getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = thoughtController;

router
  .route("/")
  .get((req, res) => getThoughts(req, res))
  .post((req, res) => createThought(req, res));

router
  .route("/:thoughtId")
  .get((req, res) => getThoughtById(req, res))  
  .put((req, res) => updateThought(req, res))
  .delete((req, res) => deleteThought(req, res));

router
  .route("/:thoughtId/reactions")
  .post((req, res) => addReaction(req, res));

router
  .route("/:thoughtId/reactions/:reactionId")
  .delete((req, res) => deleteReaction(req, res));


export default router;
