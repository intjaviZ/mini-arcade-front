import { ROOT } from "./API_ROOT"

const playGato = async (id, jugador, x, y) => {
    try {
        const res = await fetch(`${ROOT}/game/playGato/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": id,
                "jugador": jugador,
                "x": x,
                "y": y
            })
        });

        const data = await res.json();
        if (data.error) throw data;
        return data;
    } catch (error) {
        return error;
    }
}

export const hacerMovimientoGato = async ({ request }) => {
    const formData = await request.formData();

    const id = formData.get("id");
    const jugador = formData.get("jugador");
    const x = formData.get("x");
    const y = formData.get("y");

    return await playGato(id, jugador, x, y);
}