import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return ( 
        <>
            <header>
                <h1>
                    <Link to="/">Mini-arcade</Link>
                </h1>
            </header>
            <main>
                <Outlet/>    
            </main>
            <footer>
                <div>
                    <p>Javier Zárate Gómez</p>
                    <p>Cristopher Rojas Molina</p>
                    <p>Andrés Pérez Gómez</p>
                    <p>Michell Zúñiga Monterrosa</p>
                </div>
                <div><a href="">UP Chiapas</a></div>
            </footer>
        </>
     );
}
 
export default Layout;