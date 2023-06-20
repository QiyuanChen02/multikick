import { useRef } from "react";
import useSize from "@react-hook/size";

// Algorithm to pack the largest sized boxes of ratio 16:9 into a container
const packStreamers = (
    numStreamers: number,
    windowWidth: number,
    windowHeight: number
): [number, number] => {
    const maximumWidths: number[] = [1];
    for (let i = 1; i <= numStreamers; i++) {
        const numberAcross = i;

        const numberDown = Math.ceil(numStreamers / numberAcross);

        const widthElement = windowWidth / numberAcross;

        const heightElement = windowHeight / numberDown;

        maximumWidths.push(Math.min(widthElement, (heightElement * 16) / 9));
    }
    const maxWidth = Math.max(...maximumWidths);
    return [maxWidth, (maxWidth * 9) / 16];
};

type PlayersType = {
    streamers: string[];
    chatroomOpen: boolean;
};

const Players: React.FC<PlayersType> = ({ streamers, chatroomOpen }) => {
    const numStreamers = streamers.length;

    const ref = useRef<HTMLDivElement>(null);
    const [width, height] = useSize(ref);

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
                />
            ))}
        </div>
    );
};

type PlayerType = {
    width: number;
    height: number;
    streamer: string;
};

const Player: React.FC<PlayerType> = ({ width, height, streamer }) => {
    return (
        <iframe
            width={width - 4}
            height={height - 1.75}
            src={`https://player.kick.com/${streamer}`}
            title={streamer}
        ></iframe>
    );
};

export default Players;
