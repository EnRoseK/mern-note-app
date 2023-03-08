import app from "./app.js";
import env from "./utils/validateEnv.js";
import mongoose from "mongoose";

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
  console.log(`Mongoose connected`);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
