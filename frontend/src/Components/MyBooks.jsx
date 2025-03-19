import { useNavigate } from "react-router-dom";
import useGetAllUserBooks from "../Hooks/useGetAllUserBooks";
import { Button } from "./UI/Button";

const MyBooks = () => {
  const navigate = useNavigate();
  const uploadBookHandler = () => {
    navigate("/upload-book");
  };
  const { data: myBooks, refetch } = useGetAllUserBooks();
  return (
    <div>
      <div>
        {myBooks && myBooks.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {myBooks.map(
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
          <>
            <p className="ms-28 mt-24 text-2xl text-secondary">
              You did not have any books yet
            </p>
          </>
        )}
        <div className="ms-28 mt-24 cursor-pointer">
          <Button onClick={uploadBookHandler}>Upload Book</Button>
        </div>
      </div>
    </div>
  );
};
export default MyBooks;
