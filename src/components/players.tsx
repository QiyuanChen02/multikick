import { useRef } from "react";
import useSize from "@react-hook/size";
import IconButton from "./helpers/iconbutton";

/**
 * Box packing algorithm to optimally arrange 16:9 video players in a grid.
 * Tests all possible grid configurations and returns the one with largest player size.
 * 
 * @param numStreamers - Number of players to arrange
 * @param windowWidth - Available container width
 * @param windowHeight - Available container height
 * @returns [width, height] of each player in pixels
 */
const packStreamers = (
    numStreamers: number,
    windowWidth: number,
    windowHeight: number
): [number, number] => {
    const maximumWidths: number[] = [1];
    
    // Try each possible number of columns
    for (let i = 1; i <= numStreamers; i++) {
        const numberAcross = i;
        const numberDown = Math.ceil(numStreamers / numberAcross);

        const widthElement = windowWidth / numberAcross;
        const heightElement = windowHeight / numberDown;

        // Constrain to 16:9 aspect ratio - use whichever dimension is limiting
        maximumWidths.push(Math.min(widthElement, (heightElement * 16) / 9));
    }
    
    const maxWidth = Math.max(...maximumWidths);
    return [maxWidth, (maxWidth * 9) / 16];
};

type PlayersType = {
    streamers: string[];
    chatroomOpen: boolean;
    deleteStreamer: (streamer: string) => void;
};

/**
 * Grid container for all stream players.
 * Automatically calculates optimal layout based on container size.
 */
const Players: React.FC<PlayersType> = ({ streamers, chatroomOpen, deleteStreamer }) => {
    const numStreamers = streamers.length;

    const ref = useRef<HTMLDivElement>(null);
    const [width, height] = useSize(ref as React.RefObject<HTMLElement>);

    // Calculate optimal player dimensions for current container size
    const [widthPlayer, heightPlayer] = packStreamers(
        numStreamers,
        width,
        height
    );

    return (
        <div
            ref={ref}
            className={`flex h-full ${
                chatroomOpen
                    ? "invisible w-0 sm:visible md:w-[calc(100%-400px)]"
                    : "w-full"
            } flex-wrap content-center justify-center`}
        >
            {streamers.map((streamer) => (
                <Player
                    key={streamer}
                    width={widthPlayer}
                    height={heightPlayer}
                    streamer={streamer}
                    deleteStreamer={deleteStreamer}
                />
            ))}
        </div>
    );
};

type PlayerType = {
    width: number;
    height: number;
    streamer: string;
    deleteStreamer: (streamer: string) => void;
};

/**
 * Individual stream player with hover-to-show delete button.
 */
const Player: React.FC<PlayerType> = ({ width, height, streamer, deleteStreamer }) => {
    return (
        <div className="relative group" style={{ width: width - 4, height: height - 1.75 }}>
            {/* Kick.cx player embed */}
            <iframe
                width={width - 4}
                height={height - 1.75}
                src={`https://player.kick.cx/${streamer}`}
                allowFullScreen
            ></iframe>
            {/* Delete button - only visible on hover */}
            <div className="absolute top-12 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full ease-in">
                <IconButton
                    imageSrc="helpers/close-dark.svg"
                    hoverClasses="hover:cursor-pointer hover:brightness-75"
                    extraClasses="bg-kick-green rounded-full"
                    altText="Remove streamer"
                    onClick={() => deleteStreamer(streamer)}
                    width={24}
                    height={24}
                    spacing={8}
                />
            </div>
        </div>
    );
};

export default Players;
