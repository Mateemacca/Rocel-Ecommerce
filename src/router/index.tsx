import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { AboutPage, HomePage, MueblePage, MueblesPage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "muebles",
        element: <MueblesPage />,
      },
      {
        path: "muebles/:slug",
        element: <MueblePage />,
      },
      {
        path: "nosotros",
        element: <AboutPage />,
      },
    ],
  },
]);
