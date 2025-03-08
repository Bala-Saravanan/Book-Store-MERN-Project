import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import bookRoute from "./Routers/bookRouter.js";

const app = express();
const port = 8000;
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());

// Data Base Connection

connectDB();

// routers
app.use("/book", bookRoute);

// api call
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
