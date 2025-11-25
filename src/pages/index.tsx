import AddStreamer from "~/components/addStreamer";
import Chatroom from "~/components/chatroom";
import Card from "~/components/helpers/card";
import Head from "~/components/helpers/head";
import { LoadingSpinner } from "~/components/helpers/loading";
import Landing from "~/components/landing";
import Players from "~/components/players";
import ShareLayout from "~/components/shareLayout";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { useToggle } from "~/hooks/useToggle";

/**
 * Main application page.
 * Orchestrates state management for streamers, chat, and modals.
 */
export default function Home() {
    // Modal visibility toggles
    const [modalOpen, toggleModalOpen] = useToggle(false);
    const [shareOpen, toggleShareOpen] = useToggle(false);
    const [chatroomOpen, toggleChatroomOpen] = useToggle(true);

    // Streamer list synced with localStorage and URL params
    const [streamers, setStreamers, loadingStreamers] = useLocalStorage<
        string[]
    >([], "streamers");
    
    // Currently active chatroom
    const [chatroomStreamer, setChatroomStreamer, loadingChatroomStreamer] =
        useLocalStorage<string>("", "chatroomStreamer");

    const changeChatroomStreamer = (streamer: string) =>
        setChatroomStreamer(streamer);

    const addStreamer = (streamer: string) => {
        setStreamers((streamers) => {
            return streamers ? [...streamers, streamer] : [streamer];
        });
    };

    /**
     * Delete a streamer and handle chatroom switching.
     * If the deleted streamer is the active chat, switch to an adjacent streamer.
     */
    const deleteStreamer = (streamer: string) => {
        const streamerIndex = streamers.indexOf(streamer);
        const currentChatroomIndex = streamers.indexOf(chatroomStreamer);
        
        // If deleting the active chatroom, switch to previous or next streamer
        if (streamerIndex === currentChatroomIndex) {
            const nextChatroomStreamer =
                streamerIndex === 0
                    ? streamers[1] // First item: switch to next
                    : streamers[streamerIndex - 1]; // Otherwise: switch to previous
            changeChatroomStreamer(nextChatroomStreamer ?? "");
        }
        
        setStreamers((streamers) => streamers.filter((s) => s !== streamer));
    };

    return (
        <>
            <Head />

            <main className="flex h-screen w-screen flex-col items-center bg-gray-900 font-semibold text-white">
                {/* Show loading spinner during initial hydration to prevent UI flash */}
                {(loadingStreamers || loadingChatroomStreamer) && (
                    <div className="absolute left-0 top-0 z-10 h-screen w-screen bg-gray-900">
                        <LoadingSpinner width={72} height={72} />
                    </div>
                )}
                
                {/* Welcome screen when no streamers added */}
                {streamers.length === 0 ? (
                    <Landing toggleModalOpen={toggleModalOpen} />
                ) : (
                    // Main layout with players and optional chatroom
                    <div className="flex h-[calc(100%-50px)] w-full">
                        <Players
                            streamers={streamers}
                            chatroomOpen={chatroomOpen}
                            deleteStreamer={deleteStreamer}
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

                {/* Bottom navigation bar */}
                <div className="flex h-[50px] items-center justify-center">
                    <button
                        className="hover:text-kick-green px-2 hover:cursor-pointer"
                        onClick={toggleModalOpen}
                    >
                        Add Streamer
                    </button>
                    <p>|</p>
                    <button
                        className="hover:text-kick-green px-2 hover:cursor-pointer"
                        onClick={toggleChatroomOpen}
                    >
                        {chatroomOpen ? "Hide " : "Show "}Chat
                    </button>
                    <p>|</p>
                    <button
                        className="hover:text-kick-green px-2 hover:cursor-pointer"
                        onClick={() => toggleShareOpen()}
                    >
                        Share Layout
                    </button>
                </div>

                {/* Draggable modals */}
                <Card visible={modalOpen}>
                    <AddStreamer
                        streamers={streamers}
                        addStreamer={addStreamer}
                        deleteStreamer={deleteStreamer}
                        toggleModalOpen={toggleModalOpen}
                        changeChatroomStreamer={changeChatroomStreamer}
                    />
                </Card>

                <Card visible={shareOpen}>
                    <ShareLayout
                        streamers={streamers}
                        toggleShareOpen={toggleShareOpen}
                    />
                </Card>
            </main>
        </>
    );
}