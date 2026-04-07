import { Form } from "react-router-dom";

const AccessForm = ({ usuario }) => {  
    const buttonMessage = usuario ===  "anfitrion" ? "Crear sala" : "Acceder";
    return ( 
        <Form method="post" className="flex items-center justify-center">
            <div className="flex flex-col justify-center items-center bg-gray-300 w-1/2 rounded-4xl py-5">
                <input type="hidden" name="tipoUsuario" value={usuario} />
                <label>Usuario</label>
                <input name="nombreUsuario" type="text" className="border-2"/>
                {usuario === "anfitrion" ? (
                    <>
                        <label htmlFor="juegos">Selecciona un juego</label>
                        <select name="juegoSeleccionado" id="juegos">
                            <option value="gato">Gato</option>
                            <option value="ahorcado">Ahorcado</option>
                            <option value="conecta4">Conecta 4</option>
                        </select>
                    </>
                ): (
                    <>
                        <label>Código de la sala</label>
                        <input name="codigoSala" type="text" className="border-2"/>
                    </>
                )}
                <button type="submit">{ buttonMessage }</button>
            </div>
        </Form>
    );
}
 
export default AccessForm;