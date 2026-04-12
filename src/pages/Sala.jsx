import { useFetcher, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { useRol } from "../context/RolContext";
import { useEffect, useRef } from "react";
import { usePolling } from "../hooks/usePolling";
import Gato from "../components/Gato";
import Conecta4 from "../components/Conecta4";
import ReiniciarButton from "../components/ReiniciarButton";
import CerrarButton from "../components/CerrarButton";
import { Button } from "@mui/material";
import ErrorElement from "../components/ErrorElement";

const Sala = () => {
    const navigate = useNavigate();
    const iniciadoRef = useRef(false);
    const initialSala = useLoaderData();
    const fetcher = useFetcher();
    const [searchParams] = useSearchParams();
    const { rol } = useRol();

    const url = `/api/room/estadoSala/${initialSala.id_sala}`;
    const rolUsuario = rol || searchParams.get("rol");
    const esInvitado = rolUsuario === "invitado";
    const salaActual = fetcher.data ?? initialSala;
    const isReady = salaActual.estado === "ready";
    const isPlaying = salaActual.estado === "playing";
    const isFinished = salaActual.estado === "finished";
    const hasError = fetcher.data?.error !== undefined;
    
    useEffect(() => {
        if (hasError && !initialSala?.error) navigate("/");
    }, [hasError, initialSala]);

    useEffect(() => {
        if (!iniciadoRef.current && rolUsuario === "anfitrion" && initialSala.estado === "ready") {
            iniciadoRef.current = true;
            const formData = new FormData();
            formData.append("id", initialSala.id_sala);
            formData.append("jugador", initialSala.anfitrion);

            fetcher.submit(formData, { method: "post" });
        }
    }, [rolUsuario, initialSala, fetcher]);

    usePolling(() => {
        if (esInvitado) {
            fetcher.load(url);
        }
    }, 4000, isPlaying || hasError || isFinished);


    usePolling(() => {
        fetcher.load(url);
    }, 2500, isReady || hasError);

    const rolValido = rolUsuario === "anfitrion" || rolUsuario === "invitado";
    if (!rolValido) return <ErrorElement mensaje="No eres bienvenido en la sala" />;
        
    if (initialSala?.error) {
        return <div className=" w-full h-screen flex flex-col items-center justify-center gap-12">
            <h1 className="shadow-error-sala text-3xl text-center uppercase">{initialSala.error}</h1>
            <Button onClick={() => navigate('/')}>Volver</Button>
        </div>
    }

    return (<>
        <h1 className="text-3xl text-center font-bold uppercase mb-12">Que gane el mejor!</h1>
        {salaActual.tipo_juego === "gato"
            ? <Gato sala={salaActual} rol={rolUsuario} />
            : <Conecta4 sala={salaActual} rol={rolUsuario} />
        }
        {rolUsuario === "anfitrion"
            ? <div className="flex items-center justify-center gap-8 mb-8">
                <ReiniciarButton sala={salaActual} />
                <CerrarButton sala={salaActual} />
            </div>
            : <div></div>
        }
    </>);
}
export default Sala;