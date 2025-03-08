import Book from "../Models/bookModel.js";

const uploadBook = async (req, res) => {
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

export default uploadBook;
