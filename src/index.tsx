import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/root'
import Home from './routes/home'
import User from './routes/user'
import SignIn from "./routes/signIn";
import ErrorBoundary from "./routes/errorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      // {
        // element: <AuthLayout />,
        // children: [
        //   {
        //     path: "login",
        //     element: <Login />,
        //     loader: redirectIfUser,
        //   },
        //   {
        //     path: "logout",
        //     action: logoutUser,
        //   },
        // ],
      // },
    ],
    errorElement: <ErrorBoundary />
  },
]);

createRoot(document.getElementById("root") as Element).render(
  <RouterProvider router={router} />
);