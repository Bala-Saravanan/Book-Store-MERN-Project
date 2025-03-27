import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookTitle: {
      type: String,
      required: [true, "Book Title is required field!"],
      unique: [true, "Book already Exists!"],
      maxlength: [200, "Book Title length must be less than 200!"],
      trim: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9\s]+$/.test(value);
        },
        message: "Book Title can only have Letters, Numbers and spaces!",
      },
    },
    authorName: {
      type: String,
      required: [true, "Author Name is required!"],
    },
    bookDescription: {
      type: String,
      required: [true, "Book Description is required!"],
      trim: true,
    },
    aboutBook: {
      type: String,
      required: [true, "About Section is required!"],
      trim: true,
      validate: {
        validator: function (value) {
          return value.trim().split(/\s+/).length > 100;
        },
        message: "About must be more than 100 words!",
      },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Fiction",
        "Fantasy",
        "Sci-Fi",
        "Action",
        "Adventure",
        "Romance",
        "Horror",
        "Comedy",
        "Productivity",
        "Dystopian",
      ],
      required: [true, "Book category is required!"],
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (isbn) {
          const cleanISBN = isbn.replace(/-/g, "");
          return /^(97[89])?\d{9}(\d|X)$/.test(cleanISBN);
        },
        message: "The provided ISBN is not Valid!",
      },
    },
    publisher: String,
    publishedDate: String,
    pageCount: Number,
  },
  { timestamps: true }
);

const books = mongoose.model("Book", bookSchema);

export default books;
