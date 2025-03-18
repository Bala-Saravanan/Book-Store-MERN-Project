import { FaHeart } from "react-icons/fa";
import useGetAllBooks from "../Hooks/useGetAllBooks";
import Book from "./Book";
import { toast } from "sonner";
import { BOOK_API_END_POINT } from "../Constants/constants";
import axios from "axios";
import Hero from "./Hero";

const Discover = () => {
  const handleAddToFavourite = async (id) => {
    const token = localStorage.getItem("token");
    console.log("token from discover: " + token);
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
                    <Book
                      _id={_id}
                      bookTitle={bookTitle}
                      authorName={authorName}
                      imageUrl={imageUrl}
                      category={category}
                    />
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
