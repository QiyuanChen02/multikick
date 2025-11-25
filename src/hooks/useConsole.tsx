import { useEffect } from "react";

/**
 * Development hook for logging values whenever they change.
 * Useful for debugging state changes.
 */
export const useConsole = (item: unknown, message = "") => {
    useEffect(() => {
        console.log(message, item);
    }, [item, message]);
};
