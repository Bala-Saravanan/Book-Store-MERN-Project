import Book from "../Models/bookModel.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";

export const uploadBook = asyncErrorHandler(async (req, res, next) => {
  const book = req.body;
  const newBook = new Book({
    ...book,
  });
  await newBook.save();
  return res.status(201).json({
    success: true,
    message: "Book Uploaded Successfully!",
    book,
  });
});

export const getBooks = asyncErrorHandler(async (req, res, next) => {
  let { page, limit, sort } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  let skip = (page - 1) * limit;
  sort = sort || "bookTitle";

  const books = await Book.find().sort(sort).skip(skip).limit(limit);
  if (books.length === 0) {
    const error = new CustomError("No Books currently Exists!", 404);
    return next(error);
  }
  return res.status(200).json({
    success: true,
    page,
    sortBy: sort,
    result: books.length,
    books,
  });
});

export const getOneBook = asyncErrorHandler(async (req, res, next) => {
  const bookId = req.params.id;
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new CustomError("Book Not Found!", 404);
    return next(error);
  }
  return res.status(200).json({
    success: true,
    book,
  });
});

export const filterByCategory = asyncErrorHandler(async (req, res, next) => {
  const category = req.query?.category;
  // console.log(req.query);
  if (!category) {
    const error = new CustomError("Query Parameter is required!", 400);
    return next(error);
  }
  const books = await Book.find({
    category: { $regex: new RegExp(category, "i") },
  });
  if (books.length === 0) {
    const error = new CustomError("Books Not Found!", 404);
    return next(error);
  }
  return res.status(200).json({
    success: true,
    result: books.length,
    books,
  });
});

export const updateBook = asyncErrorHandler(async (req, res, next) => {
  const update = req.body;
  await Book.findByIdAndUpdate(req.params.id, update);
  return res.status(204).json({
    success: true,
    message: "Update Successful!",
  });
});

export const deleteBook = asyncErrorHandler(async (req, res, next) => {
  await Book.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Book deleted successfully!",
  });
});
