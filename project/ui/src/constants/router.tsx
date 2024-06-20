import { LINK_PATHS } from "./paths";
import HomePage from "../pages/HomePage";
import ShipmentDetails from "../pages/ShipmentDetails";
import PageNotFound from "../pages/PageNotFound";

export interface routerItem {
  path: string;
  children?: JSX.Element | null;
}

export const APP_ROUTERS: routerItem[] = [
  {
    path: LINK_PATHS.homePage,
    children: <HomePage />,
  },
  {
    path: LINK_PATHS.shipmentDetails,
    children: <ShipmentDetails />,
  },
  {
    path: LINK_PATHS.notFound,
    children: <PageNotFound />,
  },
];
