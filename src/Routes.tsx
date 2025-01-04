import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Index from "@/pages/Index"
import AboutUs from "@/pages/AboutUs"
import Contact from "@/pages/Contact"
import Checkout from "@/pages/Checkout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}