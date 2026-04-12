import { Link, Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <>

            <header className=" w-screen flex items-center justify-between px-12 py-6">
                <h1 className="home-label">
                    <Link to="/">Mini-arcade</Link>
                </h1>
                <Link to="/about">Nosotros</Link>
            </header>
            <main className="w-full">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;