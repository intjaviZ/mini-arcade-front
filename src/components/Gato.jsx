import { useFetcher } from "react-router-dom";
import Load from "./Load";

const Gato = ({ sala, rol }) => {
    const moveFetcher = useFetcher();

    if (!sala?.juego?.tablero || sala.estado === "ready") return <Load texto="Cargando juego..." />;

    const juego = sala.juego;
    const tablero = juego.tablero;
    const turno = juego.turno;
    const isSubmitting = moveFetcher.state === "submitting";
    const jugador = rol === "anfitrion" ? sala.anfitrion : sala.invitado;
    const rival = rol === "invitado" ? sala.anfitrion : sala.invitado;

    const handleClick = (fila, col) => {
        if (juego.ganador) return;
        if (turno !== jugador || isSubmitting) return;

        const formData = new FormData();
        formData.append("id", sala.id_sala);
        formData.append("jugador", jugador);
        formData.append("x", fila);
        formData.append("y", col);

        moveFetcher.submit(formData, { method: "post", action: "/api/game/playGato" });
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

            <div className=" py-16 flex flex-col gap-5 items-center justify-center">
                {tablero.map((fila, i) => (
                    <div key={i} className="flex gap-5">
                        {
                            fila.map((celda, j) => (
                                <button className={`cosito-gato ${celda === "X" ? "gato-anfitrion" : celda === "O" ? "gato-invitado" : ""} ${turno === jugador ? "turno-activo" : ""}`} key={j} onClick={() => handleClick(i, j)} style={{
                                    width: "100px",
                                    height: "100px",
                                    fontSize: "32px",
                                }}
                                    disabled={turno !== jugador || isSubmitting || juego.ganador}>
                                    {celda}
                                </button>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gato;