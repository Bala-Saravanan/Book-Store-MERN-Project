import Book from "../Models/bookModel.js";
import CustomError from "../utils/customError.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

const isExists = asyncErrorHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    const err = new CustomError("Book Not Found!", 404);
    next(err);
  }
});

export default isExists;
