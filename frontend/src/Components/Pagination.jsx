import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BOOK_API_END_POINT } from "../Constants/constants";

const Pagination = () => {
  const [searchParms, setSearchParms] = useSearchParams();
  const page = parseInt(searchParms.get("page")) || 1;
  const limit = parseInt(searchParms.get("limit")) || 9;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${BOOK_API_END_POINT}/all-books/?page=${page}?limt=${limit}`
      );
      if (response.data.success) {
        setBooks(response.data.books);
      }
    };
    fetchData();
  }, [page, limit]);
};
export default Pagination;
