type LandingType = {
    toggleModalOpen: () => void;
};

/**
 * Welcome screen displayed when no streamers have been added.
 * Shows app description, open source info, and disclaimer.
 */
const Landing: React.FC<LandingType> = ({ toggleModalOpen }) => {
    return (
        <div className="flex h-[calc(100%-50px)] w-4/5 flex-col items-center justify-center gap-8 bg-linear-to-tr lg:w-1/2">
            <h1 className="text-center text-5xl">Welcome to MultiKick!</h1>
            <h2 className="text-center text-2xl">
                Watch all your favorite Kick streamers on one page. Get started by adding a streamer.
            </h2>
            <button
                className="mt-2 rounded bg-kick-green px-4 py-3 text-xl text-black hover:cursor-pointer hover:brightness-75"
                onClick={toggleModalOpen}
            >
                Add Streamer
            </button>
            <div className="mt-4 flex w-4/5 flex-col gap-3 text-center text-md text-gray-400">
                <p>
                    This project is open source and available on{" "}
                    <a
                        href="https://github.com/QiyuanChen02/multikick"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-kick-green hover:underline"
                    >
                        GitHub
                    </a>
                    . Contributions are welcome!
                </p>
                <p className="text-sm">
                    Not affiliated with Kick.com. All trademarks belong to
                    their respective owners.
                </p>
            </div>
        </div>
    );
};

export default Landing;
