import Image from "next/image";

type LoadingSpinnerType = {
    width?: number;
    height?: number;
};

// Generates loading spinner when loading
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
