import { useEffect, useState } from "react";
import axios from "axios";
import { BOOK_API_END_POINT } from "../Constants/constants";

const useGetAllBooks = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BOOK_API_END_POINT}/all-books`, {
        headers: {
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2VkNDI1YTc5N2EwOWY5MmRlMjJhZCIsImlhdCI6MTc0MTYxNjg1MiwiZXhwIjoxNzQ0MjA4ODUyfQ.p5lOCtCcEHslggJ7Fl75-uiPv6M4RZuM1Hr5WIVMRSM",
        },
      });
      if (response.data.success) {
        setData(response.data.books);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, refetch: fetchData };
};

export default useGetAllBooks;
