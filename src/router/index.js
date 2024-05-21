import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Guest from "../middleware/Guest";
import Authenticated from "../middleware/Authenticated";

function Router() {
    const Home = lazy(() => import('../pages/Home'))
    const About = lazy(() => import('../pages/About'))
    const Login = lazy(() => import('../pages/auth/Login'))
    const Register = lazy(() => import('../pages/auth/Register'))
    const Dashboard = lazy(() => import('../pages/Dashboard'))

    return (
        <Suspense fallback={<Loading />}>
            <Navbar />

            <div className="mt-4">
                <Routes>
                    <Route path="*" element={<div>Not Found!</div>} />

                    <Route path="/" index element={<Home />} />
                    <Route path="/about" index element={<About />} />
                    <Route path="/dashboard" index element={<Authenticated render={<Dashboard />} />} />
                    <Route path="/login" index element={<Guest render={<Login />} />} />
                    <Route path="/register" index element={<Guest render={<Register />} />} />
                </Routes>
            </div>
        </Suspense>
    )
}

export default Router;