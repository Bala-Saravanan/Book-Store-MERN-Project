import Book from "../Models/bookModel.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";

const isNotExists = asyncErrorHandler(async (req, res, next) => {
  const exists = await Book.findOne({
    bookTitle: req.body.bookTitle,
  });
  if (exists) {
    const err = new CustomError("Book already Exists!", 400);
    next(err);
  }
});

export default isNotExists;
