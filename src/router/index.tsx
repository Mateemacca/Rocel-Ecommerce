import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {
  AboutPage,
  HomePage,
  LoginPage,
  MueblePage,
  MueblesPage,
  OrdersUserPage,
  Registerpage,
} from "../pages";
import { ClientLayout } from "../layouts/ClientLayout";

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
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "registro",
        element: <Registerpage />,
      },
      {
        path: "account",
        element: <ClientLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/account/pedidos" />,
          },
          {
            path: "pedidos",
            element: <OrdersUserPage />,
          },
        ],
      },
    ],
  },
]);
