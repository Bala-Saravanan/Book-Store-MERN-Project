import Book from "../Models/bookModel.js";

const getBooks = async (req, res) => {
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

export default getBooks;
