import { ROOT } from "./API_ROOT"

export const obtenerEstadoSala = async (idSala) => {
    const res = await fetch(`${ROOT}room/estadoSala/${idSala}/`);
    const data = await res.json();
    return data;
}

export const cerrarSala = async (id, anfitrion) => {
    try {
        const res = await fetch(`${ROOT}room/anfitrionSala/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "nombre": anfitrion,
                "id": id
            })
        });

        const data = await res.json();
        if(data.error) throw data;
        
        return data;
    } catch (error) {
        return error;
    }
}