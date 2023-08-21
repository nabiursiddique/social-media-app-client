import { createBrowserRouter } from "react-router-dom";
import Home from "../../components/pages/Home/Home/Home";
import MainLayout from "../../components/Layouts/MainLayout";
import SignIn from "../../components/pages/SignIn/SignIn";
import SignUp from "../../components/pages/SignUp/SignUp";
import Media from "../../components/pages/Media/Media";
import Message from "../../components/pages/Message/Message";
import About from "../../components/pages/About/About";
import PrivateRoute from "../privateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/media',
                element: <Media />
            },
            {
                path: '/message',
                element: <Message />
            },
            {
                path: '/about',
                element: <PrivateRoute><About /></PrivateRoute>
            },
            {
                path: '/signIn',
                element: <SignIn />
            },
            {
                path: '/signUp',
                element: <SignUp />
            },

        ]
    }
])

export default router;