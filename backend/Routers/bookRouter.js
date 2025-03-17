import express from "express";

import {
  filterByCategory,
  uploadBook,
  getBooks,
  getOneBook,
  updateBook,
  deleteBook,
  addToFavourites,
  getAllFavourites,
  removeFromFavourites,
} from "../Controllers/bookController.js";
import { protectedRoutes } from "../Middlewares/authMiddleware.js";

const bookRoute = express.Router();

bookRoute.get("/all-books", protectedRoutes, getBooks);
bookRoute.get("/filter", protectedRoutes, filterByCategory);
bookRoute.post("/upload", protectedRoutes, uploadBook);
bookRoute.post("/:id/add-favourite", addToFavourites);
bookRoute.get("/favourites", getAllFavourites);
bookRoute.get("/:id", protectedRoutes, getOneBook);
bookRoute.patch("/:id", protectedRoutes, updateBook);
bookRoute.delete("/:id", protectedRoutes, deleteBook);
bookRoute.delete("/favourites/:id", protectedRoutes, removeFromFavourites);

export default bookRoute;
