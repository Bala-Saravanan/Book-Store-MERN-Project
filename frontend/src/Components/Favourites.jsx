import { MdDelete } from "react-icons/md";
import useGetAllFavourites from "../Hooks/useGetAllFavourites";
import Book from "./Book";
import axios from "axios";
import { BOOK_API_END_POINT } from "../Constants/constants";
import { toast } from "sonner";

const Favourites = () => {
  const { data: favourites, refetch } = useGetAllFavourites();
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${BOOK_API_END_POINT}/favourites/${id}`,
        {
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2VkNDI1YTc5N2EwOWY5MmRlMjJhZCIsImlhdCI6MTc0MjIyMjgzNiwiZXhwIjoxNzQ0ODE0ODM2fQ.4ONqoi9NfYOJG4RtGF2LWyiGikGHTfbfsNh_h86oXE4",
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
          <>
            <p>No Books on Your Favourites!</p>
          </>
        )}
      </div>
    </>
  );
};
export default Favourites;
