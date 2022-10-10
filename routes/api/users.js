import express from "express";

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    //get all users
  })
  .post((req, res) => {
    //create user
  });

router
  .route("/:userId")
  .get((req, res) => {
    // get one user by id
  })
  .put((req, res) => {
    // update user by id
  })
  .delete((req, res) => {
    // delete user
  });


router
  .route("/:userId/friends/:friendId")
  .post((req, res) => {
    // add a new friend to a user's friend list
  })
  .delete((req, res) => {
    // delete a friend from a user's friend list
  });

export default router;
