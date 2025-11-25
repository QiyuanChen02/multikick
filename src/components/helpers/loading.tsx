import Image from "next/image";

type LoadingSpinnerType = {
    width?: number;
    height?: number;
};

/**
 * Centered loading spinner overlay.
 * Displayed during initial data hydration to prevent UI flashes.
 */
export const LoadingSpinner: React.FC<LoadingSpinnerType> = ({
    width = 24,
    height = 24,
}) => {
    return (
        <figure className="center absolute bg-gray-900">
            <Image
                src="/img/helpers/tail-spin-loader.svg"
                alt="loading"
                width={width}
                height={height}
                priority
            />
        </figure>
    );
};
