import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Form } from "react-router-dom";

const AccessForm = ({ usuario }) => {
    const buttonMessage = usuario === "anfitrion" ? "Crear sala" : "Acceder";
    return (
        <Form method="post" className="flex items-center justify-center">
            <div className="flex flex-col justify-center items-center rounded-4xl py-5">
                <input type="hidden" name="tipoUsuario" value={usuario} />
                <label className="text-center" htmlFor="nombreUsuario">Usuario</label>
                <TextField
                    className="m-12"
                    name="nombreUsuario"
                    type="text"
                    variant="outlined"
                />
                {usuario === "anfitrion" ? (
                    <>
                        <label className="text-center" htmlFor="juegos">Juego</label>
                        <Select
                            labelId="demo-simple-select-label"
                            className="m-12 w-190"
                            id="juegos"
                            name="juegoSeleccionado"
                            defaultValue=""
                            label="Selecciona un juego"
                            variant="outlined"
                        >
                            <MenuItem value={""}>Selecciona un juego</MenuItem>
                            <MenuItem value={"gato"}>Gato</MenuItem>
                            <MenuItem value={"conecta4"}>Conecta 4</MenuItem>
                        </Select>
                    </>
                ) : (
                    <>
                        <label>Código de la sala</label>
                        <TextField
                            className="m-12"
                            name="codigoSala"
                            type="text"
                            variant="outlined"
                        />
                    </>
                )}
                <Button className="m-12" type="submit">{buttonMessage}</Button>
            </div>
        </Form>
    );
};

export default AccessForm;
