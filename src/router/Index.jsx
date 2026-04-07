import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import IngresoSala from "../pages/IngresoSala";
import Home from "../pages/Home";
import { actionIngreso } from "../services/Ingreso";
import Sala from "../pages/Sala";
import Loby from "../pages/Loby";
import { obtenerEstadoSala } from "../services/Sala";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "ingreso",
        element: <IngresoSala />,
        action: actionIngreso,
        errorElement: <h1>Error al ingresar a la sala</h1>,
      },
      {
        path: "sala/:idSala",
        element: <Sala/>,
        loader: async ({ params }) => {
          const data = await obtenerEstadoSala(params.idSala);
          console.log(("Loader: ", data));
          return data;
          
        }
      },
      {
        path: "lobby/:idSala",
        element: <Loby/>,
        loader: async ({ params }) => {
          return await obtenerEstadoSala(params.idSala); 
        }
      },
      {
        path: "api/sala-status/:idSala",
        loader: async ({ params }) => {
          return await obtenerEstadoSala(params.idSala); 
        }
      }
    ],
  },
  {
    path: "*",
    element: <h1>404 - No encontrado</h1>, // Ruta de captura para errores
  },
]);