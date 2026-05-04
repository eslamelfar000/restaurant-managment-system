import { RouteObject } from "react-router-dom";
import SystemOwnerHome from "@/pages/SystemOwner/SystemOwnerHome/SystemOwnerHome";
import OrganizationsPage from "@/pages/SystemOwner/Organization/OrganizationsPage";
import OrganizationDetails from "@/pages/SystemOwner/Organization/OrganizationDetails";
import BundlesPage from "@/pages/SystemOwner/BundlesPage/BundlesPage";
import { SystemOwnerLayout } from "@/layout/SystemOwnerLayout/SystemOwnerLayout";

// Placeholder components for pending modules
import SettingsPage from "@/pages/SystemOwner/SettingsPage/SettingsPage";
import NotFound from "@/pages/NotFoundPage/NotFound";

export const systemOwnerRoutes: RouteObject = {
  path: "/system-owner",
  element: <SystemOwnerLayout />,
  children: [
    {
      index: true,
      element: <SystemOwnerHome />,
    },
    {
      path: "organizations",
      children: [
        {
          index: true,
          element: <OrganizationsPage />,
        },
        {
          path: ":orgId",
          element: <OrganizationDetails />,
        },
      ],
    },
    {
      path: "plans",
      element: <BundlesPage />,
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
