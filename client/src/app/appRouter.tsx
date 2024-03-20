import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Dashboard from "../pages/dashboard/dashboard";
import Home from "../pages/home";
import { Redirect } from "features/authentication/getToken";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
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