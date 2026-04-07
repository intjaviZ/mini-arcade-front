import { redirect } from "react-router-dom";
import { ROOT } from "./API_ROOT";

const nuevaSala = async (nombreUsuario, juegoSeleccionado) => {
  const res = await fetch(`${ROOT}room/anfitrionSala/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "nombre": nombreUsuario,
      "tipo_juego": juegoSeleccionado
    }),
  });
  
  const data = await res.json();
  if (!res.ok) throw data;
  return data
}

const accederSala = async (nombreUsuario, codigoSala) => {
  const res = await fetch(`${ROOT}room/invitadoSala/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "nombre": nombreUsuario,
      "id": codigoSala
    }),
  });
  
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export const actionIngreso = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    try {
      let response;

      if(data.tipoUsuario === "anfitrion") {
        response = await nuevaSala(data.nombreUsuario, data.juegoSeleccionado);
      } else if(data.tipoUsuario === "invitado") {
        response = await accederSala(data.nombreUsuario, data.codigoSala);
      }
      
      if (response.id_sala) {
        const ruta = response.estado === "waiting"
          ? `/lobby/${response.id_sala}`
          : `/sala/${response.id_sala}`;

        return redirect(ruta);
      }
      
      return response;
    } catch (error) {
      return error;
    }
};