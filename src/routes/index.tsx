import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChatApp from "../pages/chat/Index";
import LoginPage from "../pages/login/Login";
import SignupPage from "../pages/signup/Signup";
import ForgotPasswordPage from "../pages/forgot-password/ForgotPassword";

 export  const routes = createBrowserRouter([
    { path: '/',element: <App/>},
    { path: '/about',element: <h1>About</h1>},
    { path: '/chat',element: <ChatApp/>},
    { path: '/login',element: <LoginPage/>},
    { path: '/register',element: <SignupPage/>},
    { path: '/forgot-password',element: <ForgotPasswordPage/>},

])