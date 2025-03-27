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
    ISBN,
    publisher,
    publishedDate,
    pageCount,
  } = bookData;
  //   console.log(bookData);
  return (
    <div>
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
      </div>
      <div className="bg-bg w-4/5 border-none rounded-xl ms-52 my-10">
        <div className="flex justify-evenly items-center gap-10">
          <div className="w-1/3 m-5">
            <h1 className="text-2xl font-bold my-3">About</h1>
            <p className="text-justify">{aboutBook}</p>
          </div>
          <div className="flex flex-col gap-5 text-xl">
            <p>
              <span className="font-bold">ISBN:</span> {ISBN}
            </p>
            <p>
              <span className="font-bold">Publisher:</span> {publisher}
            </p>
            <p>
              <span className="font-bold">Published Date:</span> {publishedDate}
            </p>
            <p>
              <span className="font-bold">Number of Pages:</span> {pageCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Book;
