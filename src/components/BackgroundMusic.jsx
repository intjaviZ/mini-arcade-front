import { useEffect, useRef, useState } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Asegúrate de que la ruta sea correcta. Ejemplo: archivo en public/music/retro.mp3
    const audio = new Audio('/music/song1.mp3'); // Ruta desde public
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.warn('Error al reproducir:', err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, background: 'black', padding: '8px 12px', borderRadius: 8, fontFamily: 'monospace' }}>
      <button onClick={togglePlay} style={{ marginRight: 8 }}>
        {isPlaying ? '⏸️ Pausar música' : '▶️ Iniciar música'}
      </button>
      <button onClick={toggleMute}>
        {isMuted ? '🔇 Activar sonido' : '🔊 Silenciar'}
      </button>
    </div>
  );
};

export default BackgroundMusic;