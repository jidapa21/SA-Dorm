import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import FullLayout from "../layout/FullLayout";
const MainPages = Loadable(lazy(() => import("../pages/authentication/LoginStudent")));
const Homepages = Loadable(lazy(() => import("../pages/homepage")));
const Payment = Loadable(lazy(() => import("../pages/payment")));
const MainDorm1 = Loadable(lazy(() => import("../pages/dorm/MainDorm1")));
const MainDorm2 = Loadable(lazy(() => import("../pages/dorm/MainDorm2")));
const MainDorm3 = Loadable(lazy(() => import("../pages/dorm/MainDorm3")));
const MainDorm4 = Loadable(lazy(() => import("../pages/dorm/MainDorm4")));  
const List = Loadable(lazy(() => import("../pages/list")));
const Repair = Loadable(lazy(() => import("../pages/repair")));
const DelayedPayment = Loadable(lazy(() => import("../pages/form/DelayedPaymentForm")));
const EnExiting = Loadable(lazy(() => import("../pages/form/EnExitingForm")));
const Resigning = Loadable(lazy(() => import("../pages/form/ResigningForm")));
const Status = Loadable(lazy(() => import("../pages/status")));
const Personal = Loadable(lazy(() => import("../pages/personal")));
const PersonalCreate = Loadable(lazy(() => import("../pages/personal/create")));

const StudentRoutes = (isLoggedInStudent : boolean): RouteObject => {
  return {
    path: "/",
    element: isLoggedInStudent ? <FullLayout /> : <MainPages />,
    children: [
      {
        path: "/",
        element: <Homepages />,
      },
      {
        path: "/personal",
        children: [
          {
            path: "/personal",
            element: <Personal />,
          },
          {
            path: "/personal/create",
            element: <PersonalCreate />,
          },
        ],
      },
      {
        path: "/payment",
        children: [
          {
            path: "/payment",
            element: <Payment />,
          },
        ],
      },
      {
        path: "/dorm-booking",
        children: [
          {
            path: "/dorm-booking/mainDorm1",
            element: <MainDorm1 />,
          },
          {
            path: "/dorm-booking/mainDorm2",
            element: <MainDorm2 />,
          },
          {
            path: "/dorm-booking/mainDorm3",
            element: <MainDorm3 />,
          },
          {
            path: "/dorm-booking/mainDorm4",
            element: <MainDorm4 />,
          },
        ],
      },      
      {
        path: "/list",
        children: [
          {
            path: "/list",
            element: <List />,
          },
        ],
      },
      {
        path: "/repair",
        children: [
          {
            path: "/repair",
            element: <Repair />,
          },
        ],
      },
      {
        path: "/form",
        children: [
          {
            path: "/form/DelayedPayment",
            element: <DelayedPayment />,
          },
          {
            path: "/form/EnExiting",
            element: <EnExiting />,
          },
          {
            path: "/form/Resigning",
            element: <Resigning />,
          },
        ],
      },
      {
        path: "/status",
        children: [
          {
            path: "/status",
            element: <Status />,
          },
        ],
      },
    ],
  };
};
export default StudentRoutes;