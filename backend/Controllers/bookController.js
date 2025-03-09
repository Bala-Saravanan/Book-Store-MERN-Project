import Book from "../Models/bookModel.js";

export const uploadBook = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Error uploading Book: ${error.message}`,
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    let { page, limit, sort } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    let skip = (page - 1) * limit;
    sort = sort || "bookTitle";

    const books = await Book.find().sort(sort).skip(skip).limit(limit);
    if (books.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Books currently exists!",
        books: [],
      });
    }
    return res.status(200).json({
      success: true,
      page,
      sortBy: sort,
      result: books.length,
      books,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book Not Found!",
      });
    }
    return res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterByCategory = async (req, res) => {
  try {
    const category = req.query?.category;
    // console.log(req.query);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Query Parameter is required!",
      });
    }
    const books = await Book.find({
      category: { $regex: new RegExp(category, "i") },
    });
    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found for given category!",
      });
    }
    return res.status(200).json({
      success: true,
      result: books.length,
      books,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const update = req.body;
    await Book.findByIdAndUpdate(req.params.id, update);
    return res.status(204).json({
      success: true,
      message: "Update Successful!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });

    next(error);
  }
};
