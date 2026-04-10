// Gato.jsx
import { useState, useEffect, useRef } from 'react';
import { Paper, Typography, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useHoverSound from '../hooks/useHoverSound';
import { obtenerEstadoSala } from '../services/Sala';


const enviarMovimiento = async (id_sala, indice, jugador) => {
  const response = await fetch(`/api/sala/${id_sala}/mover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ indice, jugador })
  });
  if (!response.ok) throw new Error('Error al enviar movimiento');
  return await response.json();
};

const reiniciarSala = async (id_sala) => {
  const response = await fetch(`/api/sala/${id_sala}/reiniciar`, {
    method: 'POST'
  });
  if (!response.ok) throw new Error('Error al reiniciar');
  return await response.json();
};

// ============================================================
// Componente principal
// ============================================================
const Gato = ({ id_sala }) => {
  const theme = useTheme();
  const playHover = useHoverSound(true);

  const [tablero, setTablero] = useState(Array(9).fill(null));
  const [turnoActual, setTurnoActual] = useState(null);
  const [ganador, setGanador] = useState(null);
  const [mensaje, setMensaje] = useState('Cargando partida...');
  const [loading, setLoading] = useState(true);
  const [miNombre, setMiNombre] = useState('');
  const [esMiTurno, setEsMiTurno] = useState(false);
  const [salaEstado, setSalaEstado] = useState(null); // guardamos el estado completo

  const intervalRef = useRef(null);
  const isMounted = useRef(true);

  // Leer usuario desde sessionStorage al montar
  useEffect(() => {
    const usuario = sessionStorage.getItem('usuario');
    if (usuario) {
      setMiNombre(usuario);
    } else {
      setMiNombre('invitado');
    }
  }, []);

  // Función para cargar el estado de la sala desde el servidor
  const cargarEstadoSala = async () => {
    console.log('Cargando estado de la sala...', id_sala);
    if (!id_sala) return;
    try {
      const estado = await obtenerEstadoSala(id_sala);
      if (!isMounted.current) return;
      console.log('Estado de la sala:', estado);
      
      // Normalizar tablero: si viene vacío [] o null, lo convertimos a array de 9 nulls
      let tableroNormalizado = estado.tablero;
      if (!tableroNormalizado || tableroNormalizado.length === 0) {
        tableroNormalizado = Array(9).fill(null);
      } else if (tableroNormalizado.length !== 9) {
        console.warn('Tablero con longitud incorrecta', tableroNormalizado);
        tableroNormalizado = Array(9).fill(null);
      }
      
      setTablero(tableroNormalizado);
      setTurnoActual(estado.turno);
      setGanador(estado.ganador);
      setSalaEstado(estado);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener estado de la sala:', error);
      if (isMounted.current) {
        setMensaje('Error al conectar con el servidor');
        setLoading(false);
      }
    }
  };

  // Determinar si es mi turno
  useEffect(() => {
    if (turnoActual && miNombre && !ganador) {
      const miTurno = (turnoActual === miNombre);
      setEsMiTurno(miTurno);
      if (miTurno) {
        setMensaje(`Tu turno (${miNombre})`);
      } else {
        setMensaje(`Esperando a ${turnoActual}...`);
      }
    } else if (ganador) {
      if (ganador === miNombre) setMensaje(`¡Felicidades, ganaste!`);
      else if (ganador === 'empate') setMensaje(`¡Empate!`);
      else setMensaje(`Ganó ${ganador}. ¡Suerte la próxima!`);
      setEsMiTurno(false);
    }
  }, [turnoActual, miNombre, ganador]);

  // Cargar estado inicial y configurar polling cada 2 segundos
  useEffect(() => {
    if (id_sala) {
      cargarEstadoSala();
      intervalRef.current = setInterval(() => {
        cargarEstadoSala();
      }, 2000);
    }
    return () => {
      //isMounted.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id_sala]);

  // Sonido de clic
  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'square';
      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.1;
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
      audioCtx.resume();
    } catch (err) {
      console.warn('click sound error', err);
    }
  };

  // Manejar clic en una celda
  const handleClick = async (index) => {
    if (!esMiTurno || ganador || tablero[index]) return;
    playClickSound();
    
    setMensaje('Enviando movimiento...');
    try {
      await enviarMovimiento(id_sala, index, miNombre);
      // El polling se encargará de actualizar el estado
      setMensaje('Movimiento enviado, esperando confirmación...');
    } catch (error) {
      console.error('Error al enviar movimiento:', error);
      setMensaje('Error al enviar movimiento. Intenta de nuevo.');
    }
  };

  const handleReiniciar = async () => {
    playClickSound();
    setMensaje('Reiniciando partida...');
    try {
      await reiniciarSala(id_sala);
      await cargarEstadoSala(); // recargar inmediatamente
    } catch (error) {
      console.error('Error al reiniciar:', error);
      setMensaje('Error al reiniciar. Intenta de nuevo.');
    }
  };

  // Estilos de celda
  const celdaStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: theme.palette.background.paper,
    border: `3px dotted ${theme.palette.arcade.magenta}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    color: theme.palette.arcade.cyan,
    cursor: esMiTurno && !ganador ? 'pointer' : 'not-allowed',
    transition: 'all 0.1s ease',
    opacity: (!esMiTurno || ganador) ? 0.7 : 1,
  };

  if (loading) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: 'transparent' }}>
        <Typography sx={{ fontFamily: theme.typography.fontFamily, color: theme.palette.arcade.yellow }}>
          Cargando sala...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, borderRadius: 4 }}>
      <Typography variant="h4" sx={{ fontFamily: theme.typography.fontFamily, color: theme.palette.arcade.yellow, textShadow: `0 0 8px ${theme.palette.arcade.magenta}`, mb: 2 }}>
        Tres en Línea Arcade
      </Typography>

      <Typography variant="h6" sx={{ fontFamily: theme.typography.fontFamily, color: theme.palette.arcade.cyan, mb: 3 }}>
        {mensaje}
      </Typography>

      <Grid container spacing={1} sx={{ width: '320px', justifyContent: 'center' }}>
        {tablero.map((valor, idx) => (
          <Grid item xs={4} key={idx}>
            <div
              onClick={() => handleClick(idx)}
              onMouseEnter={esMiTurno && !ganador ? playHover : undefined}
              style={celdaStyle}
            >
              {valor && (
                <span style={{ color: valor === 'X' ? theme.palette.arcade.green : theme.palette.arcade.pink }}>
                  {valor}
                </span>
              )}
            </div>
          </Grid>
        ))}
      </Grid>

      <Button
        onClick={handleReiniciar}
        onMouseEnter={playHover}
        variant="outlined"
        sx={{ mt: 4, fontFamily: theme.typography.fontFamily, border: `2px dotted ${theme.palette.arcade.magenta}`, color: theme.palette.arcade.cyan,
          '&:hover': { border: `2px dotted ${theme.palette.arcade.yellow}`, boxShadow: `0 0 8px ${theme.palette.arcade.magenta}` }
        }}
      >
        Reiniciar Juego
      </Button>
    </Paper>
  );
};

export default Gato;