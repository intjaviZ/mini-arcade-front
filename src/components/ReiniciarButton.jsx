import Button from "@mui/material/Button";
import { useFetcher } from "react-router-dom";

const ReiniciarButton = ({ sala }) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const handleRestart = () => {

        const formData = new FormData();
        formData.append("id", sala.id_sala);
        formData.append("jugador", sala.anfitrion);

        fetcher.submit(formData, {
            method: "post",
            action: "/api/game/reiniciarJuego"
        });
    };

    return (
        <Button
            disabled={isSubmitting}
            onClick={handleRestart}
            className="border-button">
            Reiniciar Partida
        </Button>

    );
};

export default ReiniciarButton;