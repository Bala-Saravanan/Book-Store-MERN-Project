import { useEffect, useState } from "react";
import { BOOK_API_END_POINT } from "../Constants/constants";
import axios from "axios";

const useGetAllFavourites = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BOOK_API_END_POINT}/favourites`);
      if (response.data.success) {
        setData(response.data.favourites);
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

export default useGetAllFavourites;
