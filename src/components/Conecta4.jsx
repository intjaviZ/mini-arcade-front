import { useFetcher } from "react-router-dom";
import Load from "./Load";

const Conecta4 = ({ sala, rol }) => {
    const moveFetcher = useFetcher();

    if (!sala?.juego?.tablero || sala.estado === "ready") return <Load texto="Cargando juego..." />;

    const juego = sala.juego;
    const tablero = juego.tablero;
    const turno = juego.turno;
    const isSubmitting = moveFetcher.state === "submitting";
    const jugador = rol === "anfitrion" ? sala.anfitrion : sala.invitado;
    const rival = rol === "invitado" ? sala.anfitrion : sala.invitado;

    const hoverColor = rol === "anfitrion" ? "hover:bg-red-500" :
        rol === "invitado" ? "hover:bg-blue-400" :
            "hover:bg-white";

    const handleClick = (col) => {
        if (juego.ganador) return;
        if (turno !== jugador || isSubmitting) return;

        const formData = new FormData();
        formData.append("id", sala.id_sala);
        formData.append("jugador", jugador);
        formData.append("columna", col);

        moveFetcher.submit(formData, { method: "post", action: "/api/game/playConecta4" });
    };

    return (
        <div className=" relative">
            <div className="container-jugadores">
                {juego.ganador && (
                    juego.ganador === "empate"
                        ? <h2 className="ml-6 text-3xl font-bold arcade-glow-magenta animate-pulse">Empate</h2>
                        : <h2 className="ml-6 text-3xl font-bold arcade-glow-magenta animate-pulse">{juego.ganador} gana 🏆</h2>
                )}

                {!juego.ganador
                    ? <>
                        <h2 className="text-2xl font-bold mb-5 arcade-glow-cyan">Jugadores</h2>
                        <p className={`ml-6 text-2xl font-semibold transition ${turno === jugador ? "text-pink-400 scale-105 drop-shadow-[0_0_6px_#ff00ff]" : "text-pink-400 opacity-50"}`}>
                            {jugador}
                        </p>

                        <p className={`ml-6 text-2xl font-semibold transition ${turno === rival ? "text-cyan-400 scale-105 drop-shadow-[0_0_6px_#00ffff]" : "text-cyan-400 opacity-50"}`}>
                            {rival}
                        </p>
                    </>
                    : <></>
                }
            </div>

            <div className=" m-16 flex flex-col items-center justify-center">
                <div className="container-tablero">
                    <div className="flex mb-2.5 gap-2">
                        {tablero[0].map((_, col) => (
                            <button
                                className={`cosito transition-colors ${hoverColor}`}
                                key={col}
                                onClick={() => handleClick(col)}
                                disabled={turno !== jugador || isSubmitting || juego.ganador}
                            >
                                ↓
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        {tablero.map((fila, i) => (
                            <div key={i} className="flex gap-2">
                                {fila.map((celda, j) => (
                                    <div
                                        className={`w-8 h-8 sm:w-16 sm:h-16 border border-black rounded-full transition-all duration-200 ${celda === "R" ? "bg-red-500" : celda === "A" ? "bg-blue-400" : "bg-white"}`}
                                        key={j}
                                    >
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conecta4;