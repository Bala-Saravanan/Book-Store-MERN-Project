import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: [true, "Book Title is required field!"],
      unique: [true, "Book Title must be unique!"],
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
      required: true,
    },
    bookDescription: {
      type: String,
      required: true,
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
        "Sci-Fi",
        "Action",
        "Adventure",
        "Romance",
        "Horror",
        "Comedy",
        "Productivity",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const books = mongoose.model("Book", bookSchema);

export default books;
