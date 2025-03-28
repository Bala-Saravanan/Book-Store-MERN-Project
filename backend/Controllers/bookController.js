import Book from "../Models/bookModel.js";
import Favourites from "../Models/favouriteBookModel.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";

export const uploadBook = asyncErrorHandler(async (req, res, next) => {
  const book = req.body;
  const newBook = new Book({
    user: req.user,
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
  limit = parseInt(limit) || 9;
  let skip = (page - 1) * limit;
  sort = sort || "bookTitle";

  const books = await Book.find()
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("user", "name email");
  if (books.length === 0) {
    const error = new CustomError("No Books currently Exists!", 404);
    return next(error);
  }
  const total = await Book.countDocuments();
  return res.status(200).json({
    success: true,
    total,
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
  const book = await Book.findByIdAndUpdate(req.params.id, update);
  if (!book) {
    return next(new CustomError("Book Not Found!", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Update Successful!",
  });
});

export const deleteBook = asyncErrorHandler(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return next(new CustomError("Book Not Found!", 404));
  return res.status(200).json({
    success: true,
    message: "Book deleted successfully!",
  });
});

export const addToFavourites = asyncErrorHandler(async (req, res, next) => {
  const favourite = await Book.findById(req.params.id);
  if (!favourite) return next(new CustomError("Book Not Found!", 404));
  const exists = await Favourites.findOne({
    book_id: req.params.id,
    user_id: req.user,
  });
  if (exists) {
    return next(new CustomError("Book already Added to Favourites!", 400));
  }
  const favouriteBook = new Favourites({
    book_id: favourite._id,
    user_id: req.user,
  });
  await favouriteBook.save();
  return res.status(200).json({
    success: true,
    message: "Book added to Favourites!",
    book: favourite,
  });
});

export const getAllFavourites = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user;
  // console.log("userId " + userId);
  const favourites = await Favourites.find({ user_id: userId }).populate(
    "book_id"
  );
  if (favourites.length === 0)
    return next(new CustomError("No Books in Favourites!"));
  return res.status(200).json({
    success: true,
    result: favourites.length,
    favourites,
  });
});

export const removeFromFavourites = asyncErrorHandler(
  async (req, res, next) => {
    const book = await Favourites.findByIdAndDelete(req.params.id);
    if (!book) return next(new CustomError("Book Not Found!", 404));
    return res.status(200).json({
      success: true,
      message: "Book removed from Favourites!",
    });
  }
);

export const getUserBooks = asyncErrorHandler(async (req, res, next) => {
  let { page, limit, sort } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 9;
  let skip = (page - 1) * limit;
  sort = sort || "bookTitle";
  const myBooks = await Book.find({ user: req.user })
    .sort(sort)
    .skip(skip)
    .limit(limit);
  if (!myBooks)
    return next(new CustomError("You did not have any books yet!", 400));
  return res.status(200).json({
    success: true,
    result: myBooks.length,
    books: myBooks,
  });
});
