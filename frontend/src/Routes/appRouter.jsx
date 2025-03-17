import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../Components/About";
import Blog from "../Components/Blog";
import Discover from "../Components/Discover";
import Favourites from "../Components/Favourites";

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
]);

export default appRouter;
