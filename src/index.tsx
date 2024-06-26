import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./state/store";
import { Provider } from "react-redux";

import Root from "./routes/root";
import Home from "./routes/home";
import User from "./routes/User/user";
import SignIn from "./routes/signIn";
import ErrorBoundary from "./routes/errorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);

createRoot(document.getElementById("root") as Element).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
