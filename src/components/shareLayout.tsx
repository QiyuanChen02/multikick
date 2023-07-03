import { useEffect, useRef, useState } from "react";
import IconButton from "./helpers/iconbutton";

type ShareLayoutType = {
    toggleShareOpen: () => void;
    streamers: string[];
};

const ShareLayout: React.FC<ShareLayoutType> = ({
    toggleShareOpen,
    streamers,
}) => {
    const [url, setUrl] = useState("");

    const streamersFormatted = streamers
        .join(", ")
        .replace(/, ([^,]*)$/, " and $1"); // replace last comma with and

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setUrl(window.location.origin + "?streamers=" + streamers.join(","));
    }, [streamers]);

    const onCopy = async () => {
        inputRef.current?.select();
        await navigator.clipboard.writeText(url);
    };

    return (
        <div className="flex flex-col">
            <div className="drag-handle flex select-none items-center justify-between border-b border-gray-500 p-4 hover:cursor-grab active:cursor-grabbing">
                <h2>Share Layout</h2>
                <IconButton
                    hoverColour="hover:bg-gray-500"
                    imageSrc="helpers/close.svg"
                    altText="Close the tab"
                    onClick={toggleShareOpen}
                    width={20}
                    height={20}
                    spacing={5}
                    extraClasses="no-drag"
                />
            </div>
            <div className="flex w-72 flex-col gap-4 p-4">
                <p className="leading-relaxed">
                    Share the current layout with streamers {streamersFormatted}{" "}
                    by copying the link below:
                </p>
                <div className="flex flex-row">
                    <input
                        className="box-border rounded-l border border-gray-500 bg-gray-500 px-2 outline-none focus:border-white"
                        id="url"
                        type="text"
                        value={url}
                        ref={inputRef}
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                        readOnly
                    />

                    <IconButton
                        imageSrc="helpers/copy.svg"
                        altText="Copy the link"
                        onClick={() => void onCopy()}
                        extraClasses="rounded-r bg-kick-green p-3 text-black hover:brightness-75"
                    />
                </div>
            </div>
        </div>
    );
};

export default ShareLayout;
