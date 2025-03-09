import Book from "../Models/bookModel.js";

const filterByCategory = async (req, res) => {
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

export default filterByCategory;
