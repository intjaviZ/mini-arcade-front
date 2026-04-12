import { ROOT } from "./API_ROOT"

const playConecta4 = async (id, jugador, col) => {
    try {
        const res = await fetch(`${ROOT}/game/playConecta4/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": id,
                "jugador": jugador,
                "columna": col
            })
        });

        const data = await res.json();
        if(data.error) throw data;
            
        return data;
    } catch (error) {
        return error;
    }   
}

export const hacerMovimientoConecta4 = async ({ request }) => {
    const formData = await request.formData();

    const id = formData.get("id");
    const jugador = formData.get("jugador");
    const col = formData.get("columna");
    return await playConecta4(id, jugador, col);
}