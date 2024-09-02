import { createBrowserRouter } from "react-router-dom";

import Root from "pages";
import Dashboard from "pages/DashBoard";
import Home from "pages/Home";
import { Redirect } from "pages/redirect/googleRedirect";
import { VoteDetail } from "widgets/voteDetail";
import { voteLoader } from "widgets/voteDetail/model/loader";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "vote/:id",
        element: <VoteDetail />,
        loader: voteLoader(queryClient),
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
    errorElement: "Not Found Page..!!",
  },
  {
    path: "/auth/google",
    element: <Redirect />,
  },
]);

export default appRouter;
