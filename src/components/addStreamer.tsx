import { useState } from "react";
import IconButton from "./helpers/iconbutton";
import Modal from "./helpers/modal";

type AddStreamerType = {
    toggleModalOpen: () => void;
    streamers: string[];
    addStreamer: (streamer: string) => void;
    deleteStreamer: (streamer: string) => void;
    changeChatroomStreamer: (streamer: string) => void;
};

const AddStreamer: React.FC<AddStreamerType> = ({
    toggleModalOpen,
    streamers,
    addStreamer,
    deleteStreamer,
    changeChatroomStreamer,
}) => {
    return (
        <Modal title="Add Streamer" onClose={toggleModalOpen}>
            <div className="max-h-96 overflow-y-auto">
                {streamers.map((streamer) => (
                    <AddStreamerItem
                        key={streamer}
                        streamer={streamer}
                        deleteStreamer={deleteStreamer}
                    />
                ))}
            </div>
            <AddNewStreamer
                addStreamer={addStreamer}
                changeChatroomStreamer={changeChatroomStreamer}
                streamers={streamers}
            />
        </Modal>
    );
};

type AddStreamerItemType = {
    streamer: string;
    deleteStreamer: (streamer: string) => void;
};

const AddStreamerItem: React.FC<AddStreamerItemType> = ({
    streamer,
    deleteStreamer,
}) => {
    return (
        <div className="flex items-center px-4 py-1 hover:bg-gray-600">
            <p className="flex-1 bg-transparent decoration-gray-400 placeholder-gray-400 outline-none">
                {streamer}
            </p>
            <IconButton
                hoverClasses="hover:bg-gray-500 hover:cursor-pointer"
                spacing={6}
                width={15}
                height={15}
                imageSrc="helpers/bin.svg"
                altText="Delete this streamer"
                onClick={() => deleteStreamer(streamer)}
            />
        </div>
    );
};

type AddNewStreamerType = {
    addStreamer: (streamer: string) => void;
    changeChatroomStreamer: (streamer: string) => void;
    streamers: string[];
};

const AddNewStreamer: React.FC<AddNewStreamerType> = ({
    addStreamer,
    changeChatroomStreamer,
    streamers,
}) => {
    const [inputStreamer, setInputStreamer] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onAddStreamer = () => {
        if (inputStreamer === "") {
            setErrorMessage("Streamer name cannot be empty");
        } else if (streamers.includes(inputStreamer)) {
            setErrorMessage("Streamer already added");
        } else {
            addStreamer(inputStreamer);
            setInputStreamer("");
            // Auto-switch chat to newly added streamer
            changeChatroomStreamer(inputStreamer);
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputStreamer(e.target.value);
        setErrorMessage(""); // Clear error on input
    };

    return (
        <div className="flex flex-col gap-2 px-4 pb-4">
            <div className="flex gap-2">
                <input
                    className="box-border rounded border border-gray-500 bg-gray-500 px-2 outline-none focus:border-white"
                    value={inputStreamer}
                    placeholder="Streamer Name (e.g xqc)"
                    onChange={onInputChange}
                    onKeyDown={(e) => e.key === "Enter" && onAddStreamer()}
                />
                <button
                    className="rounded bg-kick-green p-3 text-black hover:brightness-75 hover:cursor-pointer"
                    onClick={onAddStreamer}
                >
                    Add
                </button>
            </div>
            <p className="text-red-500">{errorMessage}</p>
        </div>
    );
};

export default AddStreamer;
