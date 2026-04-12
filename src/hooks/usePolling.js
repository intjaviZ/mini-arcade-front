import { useEffect, useRef } from "react";

export const usePolling = (callback, interval = 2000, stopCondition = true) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (stopCondition || interval === null) return;

        const tick = () => savedCallback.current();

        const id = setInterval(tick, interval);

        return () => clearInterval(id);
    }, [interval, stopCondition]);
};