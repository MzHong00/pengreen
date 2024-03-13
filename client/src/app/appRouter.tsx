import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Signup from "../pages/signup";
import Dashboard from "../widgets/dashboard/dashboard";
import Home from "../widgets/home";

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
        element: <Signup />
    }
])

export default appRouter;