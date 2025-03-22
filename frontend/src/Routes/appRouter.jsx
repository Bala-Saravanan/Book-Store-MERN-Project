import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MyBooks from "../Components/MyBooks";

import Discover from "../Components/Discover";
import Favourites from "../Components/Favourites";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import PostBook from "../Components/PostBook";
import Book from "../Components/Book";
import { BookProvider } from "../Components/BookProvider";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <BookProvider>
        <App />
      </BookProvider>
    ),
    children: [
      {
        path: "/",
        element: <Discover />,
      },
      {
        path: "/my-books",
        element: <MyBooks />,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "/upload-book",
        element: <PostBook />,
      },
      {
        path: "/book",
        element: <Book />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default appRouter;
