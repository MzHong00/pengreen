import { createBrowserRouter } from "react-router-dom";
import Pengreen from "../domain/pengreen";
import Signup from "../domain/signup";
import Dashboard from "../components/dashboard/dashboard";
import Home from "../components/home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Pengreen />,
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

export default router