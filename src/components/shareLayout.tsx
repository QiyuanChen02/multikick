import { useEffect, useRef, useState } from "react";
import IconButton from "./helpers/iconbutton";
import Modal from "./helpers/modal";

type ShareLayoutType = {
    toggleShareOpen: () => void;
    streamers: string[];
};

/**
 * Modal for generating and copying shareable URLs.
 * Encodes current streamer list as URL query parameters.
 */
const ShareLayout: React.FC<ShareLayoutType> = ({
    toggleShareOpen,
    streamers,
}) => {
    const [url, setUrl] = useState("");
    const [copied, setCopied] = useState(false);

    // Format streamer list as "xqc, shroud and trainwreckstv"
    const streamersFormatted = streamers
        .join(", ")
        .replace(/, ([^,]*)$/, " and $1");

    const inputRef = useRef<HTMLInputElement>(null);

    // Generate shareable URL when streamers change
    useEffect(() => {
        setUrl(window.location.origin + "/" + streamers.join("/"));
    }, [streamers]);

    const onCopy = async () => {
        setCopied(true);
        
        // Reset copied state after 3 seconds
        setTimeout(() => setCopied(false), 3000);
        await navigator.clipboard.writeText(url);
    };

    return (
        <Modal title="Share Layout" onClose={toggleShareOpen}>
            <div className="flex w-72 flex-col gap-4 p-4">
                <p className="leading-relaxed">
                    Share the current layout with {streamers.length === 1 ? "the" : ""} streamer{streamers.length !== 1 ? "s" : ""} {streamersFormatted}{" "}
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
                        extraClasses="rounded-r bg-kick-green p-3 text-black hover:brightness-75 hover:cursor-pointer"
                    />
                </div>
                <div>
                    {copied && (
                        <p className="text-kick-green">Link copied to clipboard!</p>
                    )} 
                </div>
            </div>
        </Modal>
    );
};

export default ShareLayout;
