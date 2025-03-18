import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../Components/About";
import Blog from "../Components/Blog";
import Discover from "../Components/Discover";
import Favourites from "../Components/Favourites";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";

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
        element: <About />,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "/blog",
        element: <Blog />,
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
