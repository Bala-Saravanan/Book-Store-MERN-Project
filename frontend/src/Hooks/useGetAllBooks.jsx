import { useEffect, useState } from "react";
import axios from "axios";
import { BOOK_API_END_POINT } from "../Constants/constants";

const useGetAllBooks = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You'r not logged In!");
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BOOK_API_END_POINT}/all-books`, {
        headers: {
          Authorization: `bearer ${token}`,
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
