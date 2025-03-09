import express from "express";
import uploadBook from "../Controllers/uploadBook.js";
import isNotExists from "../Middlewares/isNotExists.js";
import isExists from "../Middlewares/isExists.js";
import getBooks from "../Controllers/getBooks.js";
import getOneBook from "../Controllers/getOneBook.js";
import updateBook from "../Controllers/updateBook.js";
import deleteBook from "../Controllers/deleteBooks.js";
import filterByCategory from "../Controllers/filterByCategory.js";

const bookRoute = express.Router();

bookRoute.get("/filter", filterByCategory);
bookRoute.post("/upload", isNotExists, uploadBook);
bookRoute.get("/all-books", getBooks);
bookRoute.get("/:id", getOneBook);
bookRoute.patch("/:id/update", isExists, updateBook);
bookRoute.delete("/:id/delete", isExists, deleteBook);

export default bookRoute;
