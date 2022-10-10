import express from "express";
import db from "./config/connection.js";
import routes from "./routes/index.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once("open", () => {
  app.listen(port, () => console.log(`Now listening on port ${port}`));
});
