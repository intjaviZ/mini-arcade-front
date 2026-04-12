import { useRef, useEffect } from 'react';

const useHoverSound = (enabled = true) => {
    const audioContextRef = useRef(null);
    const gainNodeRef = useRef(null);

    // Inicializar el contexto de audio solo después de una interacción del usuario
    const initAudio = () => {
        if (!audioContextRef.current && enabled) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            gainNodeRef.current = audioContextRef.current.createGain();
            gainNodeRef.current.connect(audioContextRef.current.destination);
            gainNodeRef.current.gain.value = 0.15; // Volumen bajo
        }
    };

    const playHoverSound = () => {
        if (!enabled) return;
        try {
            // Si el contexto está suspendido (política de autoplay), lo reanudamos
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }
            if (!audioContextRef.current) return;

            const now = audioContextRef.current.currentTime;
            const oscillator = audioContextRef.current.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.value = 880; // Nota La5 (aguda)
            oscillator.connect(gainNodeRef.current);
            oscillator.start();
            oscillator.stop(now + 0.1); // Duración 100ms
        } catch (err) {
            console.warn('hover sound error:', err);
        }
    };

    // Inicializar silenciosamente al montar (sin consumir gesto del usuario)
    useEffect(() => {
        if (!enabled) return;
        // No llamamos a initAudio aquí, se hará en la primera interacción global
        const handleFirstInteraction = () => {
            initAudio();
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };
        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('keydown', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);
        return () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [enabled]);

    return playHoverSound;
};

export default useHoverSound;