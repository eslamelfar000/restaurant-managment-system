import { RouteObject } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout/MainLayout";
import LandingPage from "@/pages/Main/LandingPage/LandingPage";
import BundleDetailsPage from "@/pages/Main/BundleDetailsPage/BundleDetailsPage";
import NotFound from "@/pages/NotFoundPage/NotFound";

export const mainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <LandingPage />,
    },
    {
      path: "subscribe-bundle/:bundleId",
      element: <BundleDetailsPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
