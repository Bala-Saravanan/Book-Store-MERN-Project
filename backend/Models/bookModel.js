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
  },
  { timestamps: true }
);

const books = mongoose.model("Book", bookSchema);

export default books;
