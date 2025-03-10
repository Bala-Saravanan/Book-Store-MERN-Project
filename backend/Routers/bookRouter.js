import express from "express";

import {
  filterByCategory,
  uploadBook,
  getBooks,
  getOneBook,
  updateBook,
  deleteBook,
} from "../Controllers/bookController.js";
import { protectedRoutes } from "../Middlewares/authMiddleware.js";

const bookRoute = express.Router();

bookRoute.get("/all-books", protectedRoutes, getBooks);
bookRoute.get("/filter", protectedRoutes, filterByCategory);
bookRoute.post("/upload", protectedRoutes, uploadBook);
bookRoute.get("/:id", protectedRoutes, getOneBook);
bookRoute.patch("/:id", protectedRoutes, updateBook);
bookRoute.delete("/:id", protectedRoutes, deleteBook);

export default bookRoute;
