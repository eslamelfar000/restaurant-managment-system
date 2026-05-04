import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFoundPage/NotFound";
import { mainRoutes } from "./components/mainRoutes";
import { dashboardRoutes } from "./components/dashboardRoutes";
import { systemOwnerRoutes } from "./components/systemOwnerRoutes";
import { authRoutes } from "./components/authRoutes";

const routes: RouteObject[] = [
  mainRoutes,
  dashboardRoutes,
  systemOwnerRoutes,
  authRoutes,
];

export const router = createBrowserRouter(routes);
