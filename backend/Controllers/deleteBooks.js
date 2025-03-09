import Book from "../Models/bookModel.js";

const deleteBook = async (req, res, next) => {
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

export default deleteBook;
