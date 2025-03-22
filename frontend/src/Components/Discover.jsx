import { FaHeart } from "react-icons/fa";
import useGetAllBooks from "../Hooks/useGetAllBooks";
import { toast } from "sonner";
import { BOOK_API_END_POINT } from "../Constants/constants";
import axios from "axios";
import Hero from "./Hero";
import Books from "./Books";
import { useContext } from "react";
import { BookContext } from "./BookProvider";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const { bookData, setBookData } = useContext(BookContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
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
  const { data: books, refetch } = useGetAllBooks();
  return (
    <>
      <Hero />
      <div className="relative ms-28">
        <div className="">
          {books && books.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {books.map(
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
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default Discover;
