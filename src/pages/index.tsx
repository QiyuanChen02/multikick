import AddStreamer from "~/components/addStreamer";
import Card from "~/components/helpers/card";
import Head from "~/components/helpers/head";
import IconButton from "~/components/helpers/iconbutton";
import { LoadingSpinner } from "~/components/helpers/loading";
import Players from "~/components/players";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { useToggle } from "~/hooks/useToggle";

export default function Home() {
    const [modalOpen, toggleModalOpen] = useToggle(false);
    const [chatroomOpen, toggleChatroomOpen] = useToggle(true);

    const [streamers, setStreamers, loadingStreamers] = useLocalStorage<
        string[]
    >([], "streamers");
    const [chatroomStreamer, setChatroomStreamer, loadingChatroomStreamer] =
        useLocalStorage<string>("", "chatroomStreamer");

    const changeChatroomStreamer = (streamer: string) =>
        setChatroomStreamer(streamer);

    const addStreamer = (streamer: string) => {
        setStreamers((streamers) => {
            return streamers ? [...streamers, streamer] : [streamer];
        });
    };

    const deleteStreamer = (streamer: string) => {
        const streamerIndex = streamers.indexOf(streamer);
        const currentChatroomIndex = streamers.indexOf(chatroomStreamer);
        if (streamerIndex === currentChatroomIndex) {
            const nextChatroomStreamer =
                streamerIndex === 0
                    ? streamers[1]
                    : streamers[streamerIndex - 1];
            changeChatroomStreamer(nextChatroomStreamer ?? "");
        }
        setStreamers((streamers) => streamers.filter((s) => s !== streamer));
    };

    return (
        <>
            <Head />

            <main className="flex h-screen w-screen flex-col items-center bg-gray-900 font-semibold text-white">
                {(loadingStreamers || loadingChatroomStreamer) && (
                    <div className="absolute left-0 top-0 z-10 h-screen w-screen bg-gray-900">
                        <LoadingSpinner width={72} height={72} />
                    </div>
                )}
                {streamers.length === 0 ? (
                    <div className="flex h-[calc(100%-50px)] w-5/6 flex-col items-center justify-center gap-8 bg-gradient-to-tr lg:w-1/2">
                        <h1 className="text-center text-5xl">
                            Welcome to MultiKick!
                        </h1>
                        <h2 className="text-center text-3xl">
                            With this website, you can watch as many Kick
                            streamers as you want at the same time. To get
                            started, add a streamer.
                        </h2>
                        <button
                            className="mt-2 rounded bg-kick-green px-4 py-3 text-xl text-black hover:cursor-pointer hover:brightness-75"
                            onClick={toggleModalOpen}
                        >
                            Add Streamer
                        </button>
                        <p className="w-4/5 text-center text-sm">
                            Please note that due to Kick&#x2E;com&#8217;s
                            current implementation, you cannot use the chat
                            unless you go directly onto their website.
                        </p>
                    </div>
                ) : (
                    <div className="flex h-[calc(100%-50px)] w-full">
                        <Players
                            streamers={streamers}
                            chatroomOpen={chatroomOpen}
                        />

                        {chatroomOpen && (
                            <div className="h-full w-full md:w-[400px]">
                                <Chatroom
                                    streamers={streamers}
                                    chatroomStreamer={chatroomStreamer}
                                    changeChatroomStreamer={
                                        changeChatroomStreamer
                                    }
                                    toggleModalOpen={toggleModalOpen}
                                    deleteStreamer={deleteStreamer}
                                />
                            </div>
                        )}
                    </div>
                )}

                <div className="flex h-[50px] items-center justify-center">
                    <button
                        className="hover:bright px-2 hover:cursor-pointer"
                        onClick={toggleModalOpen}
                    >
                        Add Streamer
                    </button>
                    <p>|</p>
                    <button
                        className="hover:bright px-2 hover:cursor-pointer"
                        onClick={toggleChatroomOpen}
                    >
                        {chatroomOpen ? "Hide " : "Show "}Chat
                    </button>
                    {/* <p>|</p> */}
                    {/* <button
                        className="px-2 hover:cursor-pointer"
                        onClick={toggleChatroomOpen}
                    >
                        Share Link
                    </button> */}
                </div>

                <Card visible={modalOpen}>
                    <AddStreamer
                        streamers={streamers}
                        addStreamer={addStreamer}
                        deleteStreamer={deleteStreamer}
                        toggleModalOpen={toggleModalOpen}
                        changeChatroomStreamer={changeChatroomStreamer}
                    />
                </Card>
            </main>
        </>
    );
}

type ChatroomType = {
    streamers: string[];
    chatroomStreamer: string;
    changeChatroomStreamer: (streamer: string) => void;
    toggleModalOpen: () => void;
    deleteStreamer: (streamer: string) => void;
};

const Chatroom: React.FC<ChatroomType> = ({
    streamers,
    chatroomStreamer,
    changeChatroomStreamer,
    toggleModalOpen,
    deleteStreamer,
}) => {
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-wrap gap-[1px]">
                {streamers.map((streamer) => (
                    <div
                        className={`group flex h-9 items-center gap-1 px-2 ${
                            chatroomStreamer === streamer
                                ? "border-t-2 border-kick-green bg-gray-500"
                                : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        key={streamer}
                        onClick={() => changeChatroomStreamer(streamer)}
                    >
                        <p className="translate-x-[13px] translate-y-[-2px] cursor-default group-hover:translate-x-0">
                            {streamer}
                        </p>
                        <IconButton
                            imageSrc="helpers/close.svg"
                            hoverColour="hover:bg-gray-700"
                            altText="Close the tab"
                            onClick={() => deleteStreamer(streamer)}
                            width={20}
                            height={20}
                            spacing={1}
                            visibleOnParentHover
                            eventPropagation={false}
                        />
                    </div>
                ))}

                <button
                    className="h-9 px-2 text-2xl hover:bg-gray-600"
                    onClick={() => toggleModalOpen()}
                >
                    +
                </button>
            </div>
            {chatroomStreamer && (
                <iframe
                    className="w-full flex-1"
                    src={`https://kick.com/${chatroomStreamer}/chatroom`}
                    title="title"
                ></iframe>
            )}
        </div>
    );
};
