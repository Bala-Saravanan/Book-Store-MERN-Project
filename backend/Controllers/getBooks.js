import Book from "../Models/bookModel.js";

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Books currently exists!",
        books: [],
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

export default getBooks;
