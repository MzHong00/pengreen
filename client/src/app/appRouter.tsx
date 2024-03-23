import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Dashboard from "../pages/main/dashboard";
import Home from "../pages/main/home";
import { Redirect } from "pages/redirect/googleRedirect";

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