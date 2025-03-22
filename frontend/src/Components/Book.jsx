import { useContext } from "react";
import { BookContext } from "./BookProvider";

const Book = () => {
  const { bookData } = useContext(BookContext);
  const {
    bookTitle,
    authorName,
    bookDescription,
    aboutBook,
    category,
    imageUrl,
  } = bookData;
  //   console.log(bookData);
  return (
    <div className="ms-28 mt-34 flex flex-col items-center">
      <div className="flex justify-around items-center gap-10 w-4/5 bg-primary">
        <div>
          <img className="h-100" src={imageUrl} alt="Book Image" />
        </div>
        <div className="m-5 w-1/2">
          <h1 className="text-6xl tracking-widest font-bold font-times text-wrap my-5">
            {bookTitle}
          </h1>
          <h3 className="text-3xl text-gray-500">{authorName}</h3>
          <div className="border-none rounded-lg bg-tertiary text-bg text-xl px-5 py-3 w-fit my-5">
            {category}
          </div>
          <p>{bookDescription}</p>
        </div>
      </div>
      <div className="w-1/3 m-5">
        <p>{aboutBook}</p>
      </div>
    </div>
  );
};
export default Book;
