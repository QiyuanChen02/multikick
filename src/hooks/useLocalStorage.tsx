import { useEffect, useState } from "react";

export const useLocalStorage = <T,>(intialValue: T, key: string) => {
    const [value, setValue] = useState<T>(intialValue);
    const [isInitialised, setIsInitialised] = useState(false);

    useEffect(() => {
        const item = localStorage.getItem(key);
        if (item) {
            setValue(JSON.parse(item) as T);
        }
    }, [key]);

    useEffect(() => {
        if (isInitialised) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            setIsInitialised(true);
        }
    }, [value, key, isInitialised]);

    return [value, setValue, !isInitialised] as const;
};
