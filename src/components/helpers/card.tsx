import { useRef } from "react";
import Draggable from "react-draggable";

type CardType = {
    children: null | JSX.Element | JSX.Element[];
    visible: boolean;
};

const Card: React.FC<CardType> = ({ children, visible }) => {
    // Used to disable the findDOMNode warning
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".drag-handle"
            positionOffset={{ x: "-50%", y: "-50%" }}
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
