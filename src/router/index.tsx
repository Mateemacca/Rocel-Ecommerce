import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {
  AboutPage,
  CheckoutPage,
  DashboardNewProductPage,
  DashboardOrderPage,
  DashboardOrdersPage,
  DashboardProductSlugPage,
  DashboardProductsPage,
  HomePage,
  LoginPage,
  MueblePage,
  MueblesPage,
  OrdersUserPage,
  OrderUserPage,
  Registerpage,
  ThankYouPage,
  NotFoundPage, // 👈 tu página 404
} from "../pages";
import { ClientLayout } from "../layouts/ClientLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";

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
          {
            path: "pedidos/:id",
            element: <OrderUserPage />,
          },
        ],
      },
      {
        path: "*", // 👈 cualquier ruta no encontrada dentro de "/"
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/checkout/:id/thank-you",
    element: <ThankYouPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/productos" />,
      },
      {
        path: "productos",
        element: <DashboardProductsPage />,
      },
      {
        path: "productos/new",
        element: <DashboardNewProductPage />,
      },
      {
        path: "productos/editar/:slug",
        element: <DashboardProductSlugPage />,
      },
      {
        path: "ordenes",
        element: <DashboardOrdersPage />,
      },
      {
        path: "ordenes/:id",
        element: <DashboardOrderPage />,
      },
      {
        path: "*", // 👈 rutas inexistentes dentro de dashboard
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*", // 👈 catch-all global
    element: <NotFoundPage />,
  },
]);
