import { MdDelete } from "react-icons/md";
import useGetAllFavourites from "../Hooks/useGetAllFavourites";
import axios from "axios";
import { BOOK_API_END_POINT } from "../Constants/constants";
import { toast } from "sonner";
import Books from "./Books";

const Favourites = () => {
  const { data: favourites, refetch } = useGetAllFavourites();
  // console.log(favourites);
  const deleteHandler = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You'r not Logged In!");
    }
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
                { _id, book_id: { bookTitle, authorName, imageUrl, category } },
                idx
              ) => (
                <li key={idx} className="relative">
                  <button onClick={() => deleteHandler(_id)}>
                    <MdDelete className="z-5 absolute text-xl right-10 top-15 cursor-pointer" />
                  </button>
                  <Books
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
