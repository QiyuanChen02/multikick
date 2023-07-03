import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useLocalStorage = <T,>(intialValue: T, key: string) => {
    const router = useRouter();
    const queries = router.query;

    const [value, setValue] = useState<T>(intialValue);
    const [isInitialised, setIsInitialised] = useState(false);

    useEffect(() => {
        if (queries[key] && typeof queries[key] === "string") {
            setValue((queries[key] as string).split(",") as T);
        } else {
            const item = localStorage.getItem(key);
            if (item) {
                setValue(JSON.parse(item) as T);
            }
        }
    }, [key, queries]);

    useEffect(() => {
        if (isInitialised) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            setIsInitialised(true);
        }
    }, [value, key, isInitialised]);

    return [value, setValue, !isInitialised] as const;
};
