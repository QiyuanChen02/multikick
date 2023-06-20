import { useEffect } from "react";

export const useConsole = (item: unknown, message = "") => {
    useEffect(() => {
        console.log(message, item);
    }, [item, message]);
};
