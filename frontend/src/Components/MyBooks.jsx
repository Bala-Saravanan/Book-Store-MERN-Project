import { useNavigate } from "react-router-dom";
import useGetAllUserBooks from "../Hooks/useGetAllUserBooks";
import { Button } from "./UI/Button";
import { FaHeart } from "react-icons/fa";
import Books from "./Books";

const MyBooks = () => {
  const navigate = useNavigate();
  const { data: myBooks, refetch } = useGetAllUserBooks();
  const uploadBookHandler = () => {
    navigate("/upload-book");
    refetch();
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
