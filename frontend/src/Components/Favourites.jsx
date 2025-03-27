import { MdDelete } from "react-icons/md";
import useGetAllFavourites from "../Hooks/useGetAllFavourites";
import axios from "axios";
import { BOOK_API_END_POINT } from "../Constants/constants";
import { toast } from "sonner";
import Books from "./Books";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BookContext } from "./BookProvider";

const Favourites = () => {
  const { data: favourites, refetch } = useGetAllFavourites();
  // console.log(favourites);
  const navigate = useNavigate();
  const { setBookData } = useContext(BookContext);
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You'r not Logged In!");
  }
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${BOOK_API_END_POINT}/favourites/${id}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        refetch();
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
  return (
    <>
      <div className="-z-10 ms-28 mt-15">
        <p className="ms-28 mt-24 text-center text-2xl text-secondary">
          A List of your favourite books appear here
        </p>
        {favourites && favourites.length > 0 ? (
          <ul className="grid grid-cols-3">
            {favourites.map(
              (
                {
                  _id,
                  book_id: {
                    _id: bk_id,
                    bookTitle,
                    authorName,
                    imageUrl,
                    category,
                  },
                },
                idx
              ) => (
                <li key={idx} className="relative">
                  <button onClick={() => deleteHandler(_id)}>
                    <MdDelete className="z-5 absolute text-xl right-10 top-15 cursor-pointer" />
                  </button>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleBookClick(bk_id)}
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
            <p className="ms-28 mt-24 text-2xl">
              Oops!... No Books on Your Favourites!
            </p>
          </>
        )}
      </div>
    </>
  );
};
export default Favourites;
