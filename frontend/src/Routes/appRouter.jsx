import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MyBooks from "../Components/MyBooks";
import Blog from "../Components/Blog";
import Discover from "../Components/Discover";
import Favourites from "../Components/Favourites";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import PostBook from "../Components/PostBook";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/upload-book",
        element: <PostBook />,
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
