const Book = ({ _id, bookTitle, authorName, imageUrl, category }) => {
  return (
    <div className="relative">
      <div className="flex border-none  shadow-2xl p-5 my-5 me-5 rounded-2xl w-[450px] bg-primary">
        <div>
          {/* book img */}
          <img
            src={imageUrl}
            alt="book front page"
            className="h-72 w-[192px]"
          />
        </div>
        <div className="mx-5">
          {/* book description */}

          <h1 className="text-3xl font-bold my-5 text-secondary w-[200px] line-clamp-2">
            {bookTitle}
          </h1>

          <h3 className="text-2xl font-semibold my-2 text-secondary">
            by {authorName}
          </h3>
          {/* <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
          debitis perspiciatis illum aut accusantium sit at asperiores facere
          dolorum quod!
        </p> */}
          <div className="border-none rounded-xl p-2 bg-tertiary text-xl text-bg my-2 w-fit mt-10">
            {category}
          </div>
          {/* book title author name book description book category uploaded by */}
          {/* uploaded on */}
        </div>
      </div>
    </div>
  );
};
export default Book;
