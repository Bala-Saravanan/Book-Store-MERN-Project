import { useEffect, useState } from "react";
import { BOOK_API_END_POINT } from "../Constants/constants";
import axios from "axios";
import { toast } from "sonner";

const useGetAllFavourites = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BOOK_API_END_POINT}/favourites`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      if (response.data.success) {
        setData(response.data.favourites);
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

export default useGetAllFavourites;
