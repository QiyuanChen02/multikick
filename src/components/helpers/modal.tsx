import IconButton from "./iconbutton";

type ModalProps = {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
};

/**
 * Reusable modal header component with title and close button.
 * Designed to be used inside a Card component for draggability.
 * 
 * The header has className="drag-handle" to enable dragging the parent Card.
 */
const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
    return (
        <div className="no-scrollbar flex flex-col gap-2 overflow-auto">
            {/* Draggable header - the "drag-handle" class enables dragging the parent Card */}
            <div className="drag-handle flex select-none items-center justify-between border-b border-gray-500 p-4 hover:cursor-grab active:cursor-grabbing">
                <h2>{title}</h2>
                <IconButton
                    hoverClasses="hover:bg-gray-500 hover:cursor-pointer"
                    imageSrc="helpers/close.svg"
                    altText="Close the modal"
                    onClick={onClose}
                    width={20}
                    height={20}
                    spacing={5}
                    extraClasses="no-drag" // Prevents dragging when clicking the button
                />
            </div>
            {children}
        </div>
    );
};

export default Modal;
