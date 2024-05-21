import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { authenticated } from '../store'

export default function Guest(props) {
    const navigate = useNavigate()

    const [auth, setAuth] = useRecoilState(authenticated)

    useEffect(() => {
        if (auth.check) {
            navigate("/")
        }
    }, [auth.check])

    return props.render
}
