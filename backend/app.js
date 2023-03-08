import "dotenv/config";
import express from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import notesRoute from "./routes/notes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/notes", notesRoute);

// Wrong endpoint handler
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  let errorMessage = "An unknown error occured";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
