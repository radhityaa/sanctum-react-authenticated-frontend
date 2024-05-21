/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { useRecoilState } from "recoil";
import { authenticated } from "./store";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";

function App() {
    const [auth, setAuth] = useRecoilState(authenticated)
    const [mounted, setMounted] = useState(false)

    async function getUser() {
        try {
            let { data } = await axios.get('/me')

            setAuth({
                check: true,
                user: data.data,
            })
        } catch (e) {
            console.log(e);
        }

        setMounted(true)
    }

    useEffect(() => {
        getUser();
    }, [auth.check, mounted])

    if (!mounted) {
        return <Loading />
    }

    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}

export default App;