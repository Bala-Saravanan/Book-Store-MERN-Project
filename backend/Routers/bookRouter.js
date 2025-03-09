import express from "express";
import isNotExists from "../Middlewares/isNotExists.js";
import isExists from "../Middlewares/isExists.js";
import {
  filterByCategory,
  uploadBook,
  getBooks,
  getOneBook,
  updateBook,
  deleteBook,
} from "../Controllers/bookController.js";

const bookRoute = express.Router();

bookRoute.get("/filter", filterByCategory);
bookRoute.post("/upload", isNotExists, uploadBook);
bookRoute.get("/all-books", getBooks);
bookRoute.get("/:id", getOneBook);
bookRoute.patch("/:id/update", isExists, updateBook);
bookRoute.delete("/:id/delete", isExists, deleteBook);

export default bookRoute;
