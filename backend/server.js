import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import bookRoute from "./Routers/bookRouter.js";

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
  // return res.status(404).json({
  //   success: false,
  //   message: `Can't find ${req.originalUrl} on the Server!`,
  // });
  const err = new Error(`Can't find ${req.originalUrl} on the Server!`);
  err.statusCode = 404;
  next(err);
});

// Global Error Handling Middleware

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

// api call
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
