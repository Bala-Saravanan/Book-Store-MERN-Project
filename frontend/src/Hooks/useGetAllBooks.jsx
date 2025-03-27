import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { BOOK_API_END_POINT } from "../Constants/constants";
import { toast } from "sonner";
// import { toast } from "react-toastify"; // Ensure you have toast imported

const useGetAllBooks = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 9;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!token) {
      toast.error("You're not logged in!");
    }
  }, [token]); // Runs only when token changes

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get(
        `${BOOK_API_END_POINT}/all-books?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );

      if (response.data.success) {
        setData(response.data.books);
        setTotalPages(Math.ceil(response.data.total / limit));
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to fetch books.");
    }
  }, [page, limit, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, limit });
  };

  return {
    data,
    refetch: fetchData,
    handlePageChange,
    currentPage: page,
    totalPages,
  };
};

export default useGetAllBooks;
