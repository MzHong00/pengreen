import { createBrowserRouter } from "react-router-dom";
import Home from "../domain/home";
import Signup from "../domain/signup";
import Dashboard from "../components/dashboard/dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "",
                element: <div></div>
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

export default router