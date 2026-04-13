import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import IngresoSala from "../pages/IngresoSala";
import Home from "../pages/Home";
import { obtenerEstadoSala } from "../services/Sala";
import { actionIngreso } from "../services/Ingreso";
import { hacerMovimientoGato } from "../services/PlayGato";
import { hacerMovimientoConecta4 } from "../services/PlayConecta4";
import { actionInicioJuego, actionReinicioJuego } from "../services/Game";
const Sala = lazy(() => import('../pages/Sala'));
const Loby = lazy(() => import("../pages/Loby"));
const NoEncontrado = lazy(() => import("../pages/NoEncontrado"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ErrorElement = lazy(() => import("../components/ErrorElement"));

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