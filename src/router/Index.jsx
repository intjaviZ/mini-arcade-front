import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import IngresoSala from "../pages/IngresoSala";
import Home from "../pages/Home";
import { actionIngreso } from "../services/Ingreso";
import Sala from "../pages/Sala";
import Loby from "../pages/Loby";
import { obtenerEstadoSala } from "../services/Sala";
import { actionInicioJuego, actionReinicioJuego } from "../services/Game";
import { hacerMovimientoGato } from "../services/PlayGato";
import { hacerMovimientoConecta4 } from "../services/PlayConecta4";
import NoEncontrado from "../pages/NoEncontrado";
import ErrorElement from "../components/ErrorElement";
import AboutUs from "../pages/AboutUs";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "ingreso",
                element: <IngresoSala />,
                action: actionIngreso,
                errorElement: <ErrorElement mensaje="Error al ingresar a la sala" />,
            },
            {
                path: "sala/:idSala",
                element: <Sala />,
                loader: async ({ params }) => {
                    return await obtenerEstadoSala(params.idSala);
                },
                action: actionInicioJuego,
                errorElement: <ErrorElement mensaje="Error al iniciar el juego" />,
            },
            {
                path: "lobby/:idSala",
                element: <Loby />,
                loader: async ({ params }) => {
                    return await obtenerEstadoSala(params.idSala);
                }
            },
            {
                path: "about/",
                element: <AboutUs />
            },
            {
                path: "api/room/estadoSala/:idSala",
                loader: async ({ params }) => {
                    return await obtenerEstadoSala(params.idSala);
                }
            },
            {
                path: "/api/game/playGato",
                action: hacerMovimientoGato,
            },
            {
                path: "/api/game/playConecta4",
                action: hacerMovimientoConecta4,
            },
            {
                path: "/api/game/reiniciarJuego",
                action: actionReinicioJuego,
            },
        ],
    },
    {
        path: "*",
        element: <NoEncontrado />
    },
]);