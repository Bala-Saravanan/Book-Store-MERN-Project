import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home";
import App from "../App";
import About from "../Components/About";
import Shop from "../Components/Shop";
import Blog from "../Components/Blog";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-books",
        element: <About />,
      },
      {
        path: "/favourites",
        element: <Shop />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
]);

export default appRouter;
