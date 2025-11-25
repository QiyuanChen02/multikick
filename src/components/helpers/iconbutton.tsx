import Image from "next/image";

type IconButtonType = {
    imageSrc: string;
    altText: string;
    onClick?: () => void;
    onMouseDown?: () => void;
    width?: number;
    height?: number;
    text?: string | null;
    spacing?: number;
    visibleOnParentHover?: boolean; // Show only when parent has hover state
    eventPropagation?: boolean; // Whether to stop click event bubbling
    hoverClasses?: string;
    extraClasses?: string;
};

/**
 * Highly configurable icon button component.
 * Supports visibility control, event propagation, and flexible styling.
 */
const IconButton: React.FC<IconButtonType> = ({
    imageSrc,
    altText,
    onClick,
    onMouseDown,
    width = 24,
    height = 24,
    spacing = 12,
    text = null,
    visibleOnParentHover = false,
    eventPropagation = true,
    hoverClasses = "",
    extraClasses = "",
}) => {
    const onClickButton = (
        onClick: () => void,
        eventPropagation: boolean,
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        onClick();
        // Prevent event from bubbling up (useful for nested clickable elements)
        if (!eventPropagation) {
            e.stopPropagation();
        }
    };

    const onMouseDownButton = (
        onMouseDown: () => void,
        eventPropagation: boolean,
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        onMouseDown();
        if (!eventPropagation) {
            e.stopPropagation();
        }
    };

    return (
        <button
            style={{ padding: `${spacing}px` }}
            className={`flex items-center justify-center overflow-hidden ${hoverClasses} ${extraClasses} ${
                visibleOnParentHover ? "invisible group-hover:visible" : ""
            }`}
            onMouseDown={(e) =>
                onMouseDown &&
                onMouseDownButton(onMouseDown, eventPropagation, e)
            }
            onClick={(e) =>
                onClick && onClickButton(onClick, eventPropagation, e)
            }
        >
            <Image
                src={`/img/${imageSrc}`}
                alt={altText}
                width={width}
                height={height}
                draggable={false}
            />
            {text && <p className="ml-2">{text}</p>}
        </button>
    );
};

export default IconButton;
