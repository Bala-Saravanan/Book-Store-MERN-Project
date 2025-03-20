import axios from "axios";
import { useEffect, useState } from "react";
import { BOOK_API_END_POINT } from "../Constants/constants";
import { toast } from "sonner";

const useGetAllUserBooks = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You'r Not Logged In!");
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BOOK_API_END_POINT}/my-books`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      // console.log(response);
      if (response.data.success) {
        setData(response.data.books);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, refetch: fetchData };
};

export default useGetAllUserBooks;
