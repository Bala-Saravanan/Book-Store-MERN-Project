import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    bookDescription: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const books = mongoose.model("Book", bookSchema);

export default books;
