import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import bookRoute from "./Routers/bookRouter.js";
import globalErrorHandler from "./Controllers/errorController.js";
import CustomError from "./utils/customError.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());

// Data Base Connection

connectDB();

// routers
app.use("/book", bookRoute);

// send 404 for undefined urls
app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the Server!`,
    404
  );
  next(err);
});

// Global Error Handling Middleware

app.use(globalErrorHandler);

// api call
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
