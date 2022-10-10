import connection from "../config/connection.js";
import { users, thoughts } from "./seedData.js";
import { User, Thought } from "../models/index.js";

connection.on("error", (err) => err);

connection.once("open", () => {
  console.log("connection to MongoDB");

  User.deleteMany({})
    .then(() => User.collection.insertMany(users))
    .then((data) => {
      console.log("User records inserted!");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
    .then(() => {
      Thought.deleteMany({})
        .then(() => Thought.collection.insertMany(thoughts))
        .then((data) => {
          console.log("Though records inserted!");
          process.exit(0);
        })
        .catch((err) => {
          console.error(err);
          process.exit(1);
        });
    });
});
