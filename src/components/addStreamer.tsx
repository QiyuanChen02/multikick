import { useState } from "react";
import IconButton from "./helpers/iconbutton";

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
        <div className="no-scrollbar flex flex-col gap-2 overflow-auto">
            <AddStreamerTitle toggleModalOpen={toggleModalOpen} />
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
        </div>
    );
};

type AddStreamerTitleType = {
    toggleModalOpen: () => void;
};

const AddStreamerTitle: React.FC<AddStreamerTitleType> = ({
    toggleModalOpen,
}) => {
    return (
        <div className="drag-handle flex select-none items-center justify-between border-b border-gray-500 p-4 hover:cursor-grab active:cursor-grabbing">
            <h2>Add Streamer</h2>
            <IconButton
                hoverColour="hover:bg-gray-500"
                imageSrc="helpers/close.svg"
                altText="Close the tab"
                onClick={toggleModalOpen}
                width={20}
                height={20}
                spacing={5}
            />
        </div>
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
                hoverColour="hover:bg-gray-500"
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
            changeChatroomStreamer(inputStreamer);
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputStreamer(e.target.value);
        setErrorMessage("");
    };

    return (
        <div className="flex flex-col gap-2 px-4 py-2">
            <div className="flex gap-2">
                <input
                    className="box-border rounded border border-gray-500 bg-gray-500 px-2 outline-none focus:border-white"
                    value={inputStreamer}
                    placeholder="Streamer Name (e.g xqc)"
                    onChange={onInputChange}
                    onKeyDown={(e) => e.key === "Enter" && onAddStreamer()}
                />
                <button
                    className="rounded bg-kick-green p-3 text-black hover:brightness-75"
                    onClick={onAddStreamer}
                >
                    Add
                </button>
            </div>
            <p className="text-center text-sm text-red-500">{errorMessage}</p>
        </div>
    );
};

export default AddStreamer;
