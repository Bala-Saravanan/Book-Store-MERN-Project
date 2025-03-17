import mongoose from "mongoose";

const favouriteBookSchema = new mongoose.Schema(
  {
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Favourites = mongoose.model("Favourites", favouriteBookSchema);

export default Favourites;
