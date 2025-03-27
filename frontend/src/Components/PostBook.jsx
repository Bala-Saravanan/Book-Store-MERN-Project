import axios from "axios";
import { useState } from "react";
import { BOOK_API_END_POINT } from "../Constants/constants";
import { toast } from "sonner";
import { Label } from "./UI/label";
import { Input } from "./UI/input";
import { Button } from "./UI/Button";

const PostBook = () => {
  const [bookInput, setBookInput] = useState({
    bookTitle: "",
    authorName: "",
    category: "",
    bookDescription: "",
    aboutBook: "",
    imageUrl: "",
    ISBN: "",
    publisher: "",
    publishedDate: "",
    pageCount: 0,
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setBookInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) toast.error("You'r not Logged In!");
    try {
      const response = await axios.post(
        `${BOOK_API_END_POINT}/upload`,
        bookInput,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="ms-28 mt-24">
      <div className=" w-1/2 bg-white shadow-2xl rounded-2xl p-10">
        <p className="text-center text-2xl font-bold mb-4">Upload a Book</p>

        <div className="flex justify-evenly gap-10">
          <div className="flex flex-col gap-5 w-1/2">
            <div>
              <Label>Book Title: </Label>
              <Input
                type="text"
                name="bookTitle"
                value={bookInput.bookTitle}
                onChange={changeHandler}
                placeholder="Enter Book Title..."
              />
            </div>
            <div>
              <Label>Author Name: </Label>
              <Input
                type="text"
                name="authorName"
                value={bookInput.authorName}
                onChange={changeHandler}
                placeholder="Enter Author Name..."
              />
            </div>
            <div>
              <Label>Category </Label>
              <Input
                type="text"
                name="category"
                value={bookInput.category}
                onChange={changeHandler}
                placeholder="Enter category..."
              />
            </div>
            <div>
              <Label>Description: </Label>
              <Input
                type="text"
                name="bookDescription"
                value={bookInput.bookDescription}
                onChange={changeHandler}
                placeholder="Enter Book Description..."
              />
            </div>
            <div>
              <Label>About Book: </Label>
              <Input
                type="text"
                name="aboutBook"
                value={bookInput.aboutBook}
                onChange={changeHandler}
                placeholder="Enter About Book..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 w-1/2">
            <div>
              <Label>Image URL: </Label>
              <Input
                type="url"
                name="imageUrl"
                value={bookInput.imageUrl}
                onChange={changeHandler}
                placeholder="Enter Book Image URL..."
              />
            </div>
            <div>
              <Label>ISBN Code: </Label>
              <Input
                type="text"
                name="ISBN"
                value={bookInput.ISBN}
                onChange={changeHandler}
                placeholder="Enter Book ISBN..."
              />
            </div>
            <div>
              <Label>Publisher: </Label>
              <Input
                type="text"
                name="publisher"
                value={bookInput.publisher}
                onChange={changeHandler}
                placeholder="Enter Book Publisher..."
              />
            </div>
            <div>
              <Label>Publised Date: </Label>
              <Input
                type="text"
                name="publishedDate"
                value={bookInput.publishedDate}
                onChange={changeHandler}
                placeholder="Enter Book Publised Date..."
              />
            </div>
            <div>
              <Label>Number of Pages: </Label>
              <Input
                type="number"
                name="pageCount"
                value={bookInput.pageCount}
                onChange={changeHandler}
                placeholder="Enter Number of Pages..."
              />
            </div>
          </div>
          {/* --------------------------- */}
        </div>

        <div className="flex justify-center mt-7">
          <Button
            onClick={submitHandler}
            type="submit"
            className="cursor-pointer bg-[#D5B8A4] hover:bg-[#c5a08f] text-secondary py-2 px-6 rounded-lg"
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PostBook;
