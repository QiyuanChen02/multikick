import { useRef } from "react";
import Draggable from "react-draggable";

type CardType = {
    children: React.ReactNode;
    visible: boolean;
};

/**
 * Draggable modal wrapper component.
 * 
 * Children must include an element with className="drag-handle" for dragging.
 * Elements with className="no-drag" won't trigger drag (e.g., buttons, inputs).
 */
const Card: React.FC<CardType> = ({ children, visible }) => {
    // Ref required by react-draggable to avoid deprecated findDOMNode warnings
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".drag-handle" // Only elements with this class can initiate drag
            cancel=".no-drag" // Elements with this class won't trigger drag
            defaultPosition={{ x: 0, y: 0 }} // Start at center (via CSS transform)
        >
            <section
                ref={nodeRef}
                className={`${
                    visible ? "visible" : "invisible"
                } center fixed overflow-hidden rounded-lg border border-black bg-gray-700`}
            >
                {children}
            </section>
        </Draggable>
    );
};

export default Card;
