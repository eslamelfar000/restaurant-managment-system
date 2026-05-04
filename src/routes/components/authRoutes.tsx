import { RouteObject } from "react-router-dom";
import { AuthLayout } from "@/layout/AuthLayout/AuthLayout";
import RestaurantLoginPage from "@/pages/Auth/RestaurantLoginPage/RestaurantLoginPage";
import SystemOwnerLoginPage from "@/pages/Auth/SystemOwnerLoginPage/SystemOwnerLoginPage";
import NotFound from "@/pages/NotFoundPage/NotFound";

export const authRoutes: RouteObject = {
  path: "login",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <RestaurantLoginPage />
    },
    {
      path: "system-login",
      element: <SystemOwnerLoginPage/>,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
