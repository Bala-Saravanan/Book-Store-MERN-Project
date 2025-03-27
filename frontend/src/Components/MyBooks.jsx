import { useNavigate } from "react-router-dom";
import useGetAllUserBooks from "../Hooks/useGetAllUserBooks";
import { Button } from "./UI/Button";
import { FaHeart } from "react-icons/fa";
import Books from "./Books";
import axios from "axios";
import { BOOK_API_END_POINT } from "../Constants/constants";
import { useContext } from "react";
import { BookContext } from "./BookProvider";
import { toast } from "sonner";

const MyBooks = () => {
  const { setBookData } = useContext(BookContext);
  const navigate = useNavigate();
  const { data: myBooks, refetch } = useGetAllUserBooks();
  const uploadBookHandler = () => {
    navigate("/upload-book");
    refetch();
  };
  const token = localStorage.getItem("token");
  const handleBookClick = async (id) => {
    try {
      // console.log(token);
      const response = await axios.get(`${BOOK_API_END_POINT}/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      if (response.data.success) {
        const data = response.data.book;
        // console.log(data);
        // console.log(bookData);
        setBookData(data);
        // console.log(bookData);
        navigate("/book");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddToFavourite = async (id) => {
    // console.log("token from discover: " + token);
    if (!token) {
      toast.error("You'r not Logged In!");
    }
    try {
      const response = await axios.post(
        `${BOOK_API_END_POINT}/${id}/add-favourite`,
        {},
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
    <div>
      <div className="ms-28 mt-24">
        <div className="flex justify-center gap-10 m-5">
          <p className="text-center text-2xl text-secondary">
            A List of Your Books Appear Here
          </p>
          <Button className="cursor-pointer" onClick={uploadBookHandler}>
            Upload Book
          </Button>
        </div>
        {myBooks && myBooks.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {myBooks.map(
              ({ _id, bookTitle, authorName, imageUrl, category }, idx) => (
                <li key={idx} className="relative">
                  <button onClick={() => handleAddToFavourite(_id)}>
                    <FaHeart className="text-xl absolute right-10 top-15 z-5 cursor-pointer" />
                  </button>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleBookClick(_id)}
                  >
                    <Books
                      _id={_id}
                      bookTitle={bookTitle}
                      authorName={authorName}
                      imageUrl={imageUrl}
                      category={category}
                    />
                  </div>
                </li>
              )
            )}
          </ul>
        ) : (
          <>
            <p className="ms-28 mt-24 text-2xl text-secondary">
              You did not have any books yet
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default MyBooks;
