import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Two-Scents", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose.connection;
