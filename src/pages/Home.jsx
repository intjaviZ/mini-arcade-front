import { useEffect, useRef } from "react";
import BackgroundMusic from "../components/BackgroundMusic";
import PrimaryCard from "../components/PrimaryCard";

const Home = () => {
   const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    // Configuración del juego Pong (para fondo)
    let ball = { x: 0, y: 0, radius: 6, dx: 3, dy: 2 };
    let paddleLeft = { y: 0, width: 10, height: 80 };
    let paddleRight = { y: 0, width: 10, height: 80 };
    // let leftScore = 0;
    // let rightScore = 0;

    // Colores (puedes usar las variables CSS de tu paleta)
    const colors = {
      bg: "#0a0f12",
      net: "#00ffff",
      ball: "#ffff00",
      paddle: "#ff00ff",
      score: "#ff00ff",
    };

    const resizeCanvas = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;

      ball.radius = Math.min(8, Math.max(4, width / 80));
      paddleLeft.width = Math.max(6, width / 80);
      paddleRight.width = paddleLeft.width;
      paddleLeft.height = Math.max(50, height / 8);
      paddleRight.height = paddleLeft.height;

      paddleLeft.y = height / 2 - paddleLeft.height / 2;
      paddleRight.y = height / 2 - paddleRight.height / 2;

      if (ball.x === 0) {
        ball.x = width / 2;
        ball.y = height / 2;
      }
      let speedFactor = Math.min(5, width / 200);
      ball.dx = (ball.dx > 0 ? speedFactor : -speedFactor);
      ball.dy = (ball.dy > 0 ? speedFactor : -speedFactor);
    };

    const drawNet = () => {
      ctx.beginPath();
      ctx.setLineDash([10, 15]);
      ctx.strokeStyle = colors.net;
      ctx.lineWidth = 2;
      ctx.moveTo(width / 2, 0);
     // ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
      drawNet();

      ctx.fillStyle = colors.paddle;
      ctx.fillRect(0, paddleLeft.y, paddleLeft.width, paddleLeft.height);
      ctx.fillRect(width - paddleRight.width, paddleRight.y, paddleRight.width, paddleRight.height);

      ctx.fillStyle = colors.ball;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

    };

    const update = () => {
      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= height) {
        ball.dy = -ball.dy;
      }

      // IA para ambas palas (siguen la pelota)
      let targetY = ball.y - paddleLeft.height / 2;
      paddleLeft.y += (targetY - paddleLeft.y) * 0.08;
      paddleLeft.y = Math.max(0, Math.min(height - paddleLeft.height, paddleLeft.y));

      let targetYRight = ball.y - paddleRight.height / 2;
      paddleRight.y += (targetYRight - paddleRight.y) * 0.08;
      paddleRight.y = Math.max(0, Math.min(height - paddleRight.height, paddleRight.y));

      // Colisión izquierda
      if (
        ball.x - ball.radius <= paddleLeft.width &&
        ball.y + ball.radius >= paddleLeft.y &&
        ball.y - ball.radius <= paddleLeft.y + paddleLeft.height
      ) {
        ball.dx = Math.abs(ball.dx);
        let hitPos = (ball.y - paddleLeft.y) / paddleLeft.height;
        ball.dy = (hitPos - 0.5) * 16;
        ball.dy = Math.random() > 0.5 ? Math.min(8, ball.dy) : Math.min(8, Math.max(-8, ball.dy));
        ball.x = paddleLeft.width + ball.radius;
      }

      // Colisión derecha
      if (
        ball.x + ball.radius >= width - paddleRight.width &&
        ball.y + ball.radius >= paddleRight.y &&
        ball.y - ball.radius <= paddleRight.y + paddleRight.height
      ) {
        ball.dx = -Math.abs(ball.dx);
        let hitPos = (ball.y - paddleRight.y) / paddleRight.height;
        ball.dy = (hitPos - 0.5) * 16;
        ball.dy = Math.random() > 0.5 ? Math.min(8, ball.dy) : Math.min(8, Math.max(-8, ball.dy));
        ball.x = width - paddleRight.width - ball.radius;
      }

      // Puntuación y reinicio
      if (ball.x + ball.radius < 0) {
        resetBall("right");
      } else if (ball.x - ball.radius > width) {
        resetBall("left");
      }
    };

    const resetBall = (scoredSide) => {
      ball.x = width / 2;
      ball.y = height / 2;
      let speed = Math.min(5, width / 15);
      ball.dx = scoredSide === "right" ? -speed : speed;
      ball.dy = (Math.random() > 0.5 ? speed : -speed);
    };

    const animate = () => {
      update();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center h-screen"
    >
        <div>
          <div ref={containerRef} className="pong-background">
          <canvas ref={canvasRef} id="pongCanvas"></canvas>
        </div>
        <BackgroundMusic />
        <h2 className="text-center text-3xl">¿Anfitrión o invitado?</h2>

        <div className="flex items-center justify-center gap-4 m-8">
          <PrimaryCard
            text="Crear una sala"
            route="/ingreso?usuario=anfitrion"
          />
          <PrimaryCard
            text="Unirme a una sala"
            route="/ingreso?usuario=invitado"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
