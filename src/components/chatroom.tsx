import IconButton from "./helpers/iconbutton";

type ChatroomType = {
    streamers: string[];
    chatroomStreamer: string;
    changeChatroomStreamer: (streamer: string) => void;
    toggleModalOpen: () => void;
    deleteStreamer: (streamer: string) => void;
};

/**
 * Tabbed chat interface with embedded Kick.com chatrooms.
 * Uses height hack to hide Kick's header/footer in the iframe.
 */
const Chatroom: React.FC<ChatroomType> = ({
    streamers,
    chatroomStreamer,
    changeChatroomStreamer,
    toggleModalOpen,
    deleteStreamer,
}) => {
    return (
        <div className="flex h-full flex-col">
            {/* Tab bar with streamer names */}
            <div className="flex flex-wrap gap-px">
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
                        {/* Text shifts left on hover to make room for delete button */}
                        <p className="translate-x-[13px] -translate-y-0.5 cursor-default group-hover:translate-x-0">
                            {streamer}
                        </p>
                        <IconButton
                            imageSrc="helpers/close.svg"
                            hoverClasses="hover:bg-gray-700 hover:cursor-pointer"
                            altText="Close the tab"
                            onClick={() => deleteStreamer(streamer)}
                            width={20}
                            height={20}
                            spacing={1}
                            visibleOnParentHover
                            eventPropagation={false} // Prevent tab switch on delete
                        />
                    </div>
                ))}
                <button
                    className="h-9 px-2 text-2xl hover:bg-gray-600 hover:cursor-pointer"
                    onClick={() => toggleModalOpen()}
                >
                    +
                </button>
            </div>
            <div className="relative w-full h-full overflow-hidden border-b border-gray-700">
                {chatroomStreamer && (
                    <iframe
                        className="w-full absolute"
                        style={{ height: "calc(100%)" }}
                        src={`https://chat.kick.cx/embed/${chatroomStreamer}`}
                    ></iframe>
                )}
            </div>
        </div>
    );
};

export default Chatroom;