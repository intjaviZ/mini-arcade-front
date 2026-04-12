import { ROOT } from "./API_ROOT"

const iniciarJuego = async (id, jugador) => {
    try {
        const res = await fetch(`${ROOT}/game/iniciarJuego/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": id,
                "jugador": jugador
            })
        });

        const data = await res.json();
        if(data.error) throw data;
        return data;
    } catch (error) {
        return error;
    }   
}
const reiniciarJuego = async (id, jugador) => {
    try {
        const res = await fetch(`${ROOT}/game/reiniciarJuego/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": id,
                "jugador": jugador
            })
        });

        const data = await res.json();
        if(data.error) throw data;
            
        return data;
    } catch (error) {
        return error;
    }   
}

export const actionInicioJuego = async ({ request }) => {
    const formData = await request.formData();

    const id = formData.get("id");
    const jugador = formData.get("jugador");

    return await iniciarJuego(id, jugador);
}

export const actionReinicioJuego = async ({ request }) => {
    const formData = await request.formData();

    const id = formData.get("id");
    const jugador = formData.get("jugador");

    return await reiniciarJuego(id, jugador);
}