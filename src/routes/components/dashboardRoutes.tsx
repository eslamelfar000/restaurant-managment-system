import { RouteObject } from "react-router-dom";
import DashboardHome from "@/pages/Dashboard/DashboardHome";
import MealsPage from "@/pages/Dashboard/MealsPage";
import UsersPage from "@/pages/Dashboard/UsersPage";
import CategoriesPage from "@/pages/Dashboard/CategoriesPage";
import HallManagementPage from "@/pages/Dashboard/HallManagementPage";
import SettingsPage from "@/pages/Dashboard/SettingsPage";
import { RestoDashLayout } from "@/layout/RestoDashLayout/RestoDashLayout";
import NotFound from "@/pages/NotFoundPage/NotFound";

export const dashboardRoutes: RouteObject = {
  path: "/dashboard",
  element: <RestoDashLayout />,
  children: [
    {
      index: true,
      element: <DashboardHome />,
    },
    {
      path: "users",
      element: <UsersPage />,
    },
    {
      path: "meals",
      element: <MealsPage />,
    },
    {
      path: "categories",
      element: <CategoriesPage />,
    },
    {
      path: "hall",
      element: <HallManagementPage />,
    },
    {
      path: "settings",
      element: <SettingsPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
