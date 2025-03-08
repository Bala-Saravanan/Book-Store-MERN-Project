import Book from "../Models/bookModel.js";

const getOneBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return book.status(404).json({
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

export default getOneBook;
