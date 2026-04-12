import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useActionData, useSearchParams } from "react-router-dom";
import AccessForm from "../components/AccessForm";
import { useRol } from "../context/RolContext";
import { useState, useEffect } from "react";

const IngresoSala = () => {
    const [open, setOpen] = useState(false);
    const actionData = useActionData();
    const [searchParams] = useSearchParams();
    const usuario = searchParams.get("usuario");
    const { setRol } = useRol();

    useEffect(() => {
        if (usuario === "anfitrion" || usuario === "invitado") setRol(usuario);
    }, [usuario, setRol]);

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (actionData?.error || actionData?.mensaje) {
            setOpen(true);
        }
    }, [actionData?.error, actionData?.mensaje]);

    return (
        <section className="flex justify-center">
            <div className="container-sala">
                <h2 className="text-center">Preparando sala...</h2>
                <AccessForm usuario={usuario} />

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        {actionData?.error ? "Error" : "Mensaje"}
                    </DialogTitle>

                    <DialogContent>
                        <p>
                            {actionData?.error || actionData?.mensaje}
                        </p>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </section>
    );
};

export default IngresoSala;
