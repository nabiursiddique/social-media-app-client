import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home/Home/Home";
import MainLayout from "../components/Layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
])

export default router;