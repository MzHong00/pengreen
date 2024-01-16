import { createBrowserRouter } from "react-router-dom";
import Home from "../domain/home";
import Signup from "../components/account/signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                
            },
        ]
    },
    {
        path: "/auth/google/redirect",
        element: <Signup />
    }
])

export default router