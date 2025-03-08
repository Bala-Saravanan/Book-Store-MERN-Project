import Book from "../Models/bookModel.js";

const isNotExists = async (req, res, next) => {
  try {
    const exists = await Book.findOne({
      bookTitle: req.body.bookTitle,
    });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Book already exists!",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default isNotExists;
