import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Custom hook that syncs state with both localStorage and URL query parameters.
 * URL query params take precedence over localStorage on initial load.
 * 
 * @param intialValue - Default value if no stored value exists
 * @param key - Key for localStorage and URL query param
 * @returns Tuple of [value, setValue, isLoading] - check isLoading before rendering
 * 
 * @example
 * // URL: /?streamers=xqc,shroud
 * const [streamers, setStreamers, loading] = useLocalStorage<string[]>([], "streamers");
 * // streamers will be ["xqc", "shroud"] from URL
 */
export const useLocalStorage = <T,>(intialValue: T, key: string) => {
    const router = useRouter();
    const queries = router.query;

    const [value, setValue] = useState<T>(intialValue);
    const [isInitialised, setIsInitialised] = useState(false);

    // On mount: Load from URL query params (priority) or localStorage
    useEffect(() => {
        if (queries[key] && typeof queries[key] === "string") {
            // Parse comma-separated URL param into array
            setValue((queries[key] as string).split(",") as T);
        } else {
            const item = localStorage.getItem(key);
            if (item) {
                setValue(JSON.parse(item) as T);
            }
        }
    }, [key, queries]);

    // On value change: Persist to localStorage (skip initial render)
    useEffect(() => {
        if (isInitialised) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            setIsInitialised(true);
        }
    }, [value, key, isInitialised]);

    return [value, setValue, !isInitialised] as const;
};
