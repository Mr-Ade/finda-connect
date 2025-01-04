import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;