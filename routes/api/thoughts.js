import express from "express";

const router = express.Router();

router.route("/").get((req, res) => {
  //get all thoughts
});

router
  .route("/:thoughtId")
  .get((req, res) => {
    // get one thought by id
  })
  .post((req, res) => {
    // create thought
    // add thought to user's thought array
  })
  .put((req, res) => {
    // update thought by id
  })
  .delete((req, res) => {
    // delete thought
  });

router
  .route("/:thoughtId/reactions")
  .post((req, res) => {
    // add reaction to thought
  })
  .delete((req, res) => {
    // delete reaction
  });

export default router;
