import { createBrowserRouter } from "react-router-dom";

import Root from "pages";
import Dashboard from "pages/DashBoard";
import Home from "pages/Home";
import { Redirect } from "pages/redirect/googleRedirect";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            }
        ]
    },
    {
        path: "/auth/google",
        element: <Redirect />
    }
])

export default appRouter;