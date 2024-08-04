import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import { useSelector } from "react-redux"
const Layout = () => {
    let token = useSelector((state) => state.auth.token)
    let userData = useSelector((state) => state.auth.user)

    return (
        <>
            <Header />
            <main>
                {
                    token && userData ?
                        <Outlet /> :
                        <Navigate to="/login" replace />
                }
            </main>
        </>
    )
}

export default Layout