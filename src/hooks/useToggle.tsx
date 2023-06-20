import { useState } from "react";

export const useToggle = (init: boolean): [boolean, () => void] => {
    const [state, setState] = useState(init);
    const toggleState = () => setState((state) => !state);
    return [state, toggleState];
};
