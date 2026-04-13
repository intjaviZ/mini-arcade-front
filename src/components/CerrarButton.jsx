import { useNavigate } from "react-router-dom";
import { cerrarSala } from "../services/Sala";
import Button from "@mui/material/Button";

const CerrarButton = ({ sala }) => {
    const navigate = useNavigate();

    const handleClose = async () => {
        await cerrarSala(sala.id_sala, sala.anfitrion);
        navigate("/");
    };

    return (
        <Button className="border-button" onClick={handleClose}>
            Cerrar Sala
        </Button>
    );
};

export default CerrarButton;