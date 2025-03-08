import Book from "../Models/bookModel.js";

const updateBook = async (req, res) => {
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

export default updateBook;
