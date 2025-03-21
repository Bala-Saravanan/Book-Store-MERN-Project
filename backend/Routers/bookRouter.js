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
  getUserBooks,
} from "../Controllers/bookController.js";
import { protectedRoutes } from "../Middlewares/authMiddleware.js";

const bookRoute = express.Router();

bookRoute.get("/all-books", protectedRoutes, getBooks);
bookRoute.get("/my-books", protectedRoutes, getUserBooks);
bookRoute.get("/filter", protectedRoutes, filterByCategory);
bookRoute.post("/upload", protectedRoutes, uploadBook);
bookRoute.post("/:id/add-favourite", protectedRoutes, addToFavourites);
bookRoute.get("/favourites", protectedRoutes, getAllFavourites);
bookRoute.get("/:id", protectedRoutes, getOneBook);
bookRoute.patch("/:id", protectedRoutes, updateBook);
bookRoute.delete("/:id", protectedRoutes, deleteBook);
bookRoute.delete("/favourites/:id", protectedRoutes, removeFromFavourites);

export default bookRoute;
