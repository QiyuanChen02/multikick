import { useState } from "react";

/**
 * Simple hook for boolean toggle state.
 * 
 * @param init - Initial boolean value
 * @returns Tuple of [state, toggleFunction]
 */
export const useToggle = (init: boolean): [boolean, () => void] => {
    const [state, setState] = useState(init);
    const toggleState = () => setState((state) => !state);
    return [state, toggleState];
};
