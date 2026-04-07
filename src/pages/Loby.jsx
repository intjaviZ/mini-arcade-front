import { useEffect } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { cerrarSala } from "../services/Sala";

const Loby = () => {
    const initialSala = useLoaderData();
    const fetcher = useFetcher();
    const navigate = useNavigate();

    useEffect(() => {
        let activo = true;
        const startTime = Date.now();

        const interval = setInterval(() => {
            if (!activo) return;
            const elapsed = Date.now() - startTime;
            if (elapsed > 60000) {
                clearInterval(interval);
                cerrarSala(initialSala.id_sala, initialSala.anfitrion);
                navigate("/");
            } else {
                fetcher.load(`/api/sala-status/${initialSala.id_sala}`);
            }
        }, 5000);

        return () => {
            activo = false;
            clearInterval(interval);
        }
    }, [initialSala.id_sala]);

    useEffect(() => {
        if (fetcher.data?.estado === "ready") navigate(`/sala/${initialSala.id_sala}`);

    }, [fetcher.data, navigate, initialSala.id_sala]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-800 text-white">
            <h1 className="text-3xl font-bold mb-4">Esperando a un rival...</h1>
            <div className="bg-slate-700 p-8 rounded-xl shadow-2xl text-center">
                <p className="text-gray-400">Código de la sala</p>
                <p className="text-5xl font-mono tracking-widest text-yellow-400 mb-6">
                    {initialSala.id_sala}
                </p>
                <p className="text-sm">Juego: {initialSala.tipo_juego}</p>
                <div className="mt-6 animate-bounce">⏳</div>
            </div>
        </div>
    );
}

export default Loby;