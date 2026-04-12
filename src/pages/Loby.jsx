import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { cerrarSala } from "../services/Sala";
import { usePolling } from "../hooks/usePolling";

const Loby = () => {
    const [timeoutExceeded, setTimeoutExceeded] = useState(false);
    const initialSala = useLoaderData();
    const fetcher = useFetcher();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutExceeded(true);
            cerrarSala(initialSala.id_sala, initialSala.anfitrion);
            navigate("/");
        }, 60000);

        return () => clearTimeout(timer);
    }, [initialSala, navigate]);

    const isReady = fetcher.data?.estado === "ready";

    usePolling(() => {
        fetcher.load(`/api/room/estadoSala/${initialSala.id_sala}`);
    }, 5000, isReady || timeoutExceeded);

    useEffect(() => {
        if (isReady) {
            navigate(`/sala/${initialSala.id_sala}?rol=anfitrion`);
        }
    }, [isReady, navigate, initialSala.id_sala]);

    return (
        <div className="flex flex-col items-center justify-start pt-36 h-screen">
            <h1 className="tittle-loby">Esperando a un rival...</h1>
            <div className="container-lobby text-center">
                <p className="text-gray-400">Código de la sala</p>
                <p className="id-lobby">
                    {initialSala.id_sala}
                </p>
                <p className="text-sm">Juego: {initialSala.tipo_juego}</p>
                <div className="mt-6 animate-bounce">⏳</div>
            </div>
        </div>
    );
}

export default Loby;