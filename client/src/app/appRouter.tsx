import { createBrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import Root from "pages";
import Dashboard from "pages/DashBoard";
import Home from "pages/Home";
import { Redirect } from "pages/redirect/googleRedirect";
import { VoteDetail } from "widgets/voteDetail";
import { voteLoader } from "widgets/voteDetail/model/loader";
import { VoteForm } from "widgets/VoteForm";

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
      {
        path: "create",
        element: <VoteForm />,
      },
    ],
    errorElement: <div>Not Found Page..!!</div>,
  },
  {
    path: "/auth/google",
    element: <Redirect />,
  },
]);

export default appRouter;
