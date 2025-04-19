import React from "react";

function ChatWindowBig(props) {
    const {setWinSel} = props;
    return (
        <div className="w-96 h-128 bg-green-100 text-black flex flex-col">
            <div className="flex flex-row h-10 w-full bg-yellow-100">
                <button className="items-start bg-red-100 p-2" onClick={() => setWinSel(1)}>Back</button>
                <div className="flex flex-row ml-auto space-x-1">
                    <button className="bg-red-100 p-2" onClick={() => setWinSel(0)}>X</button>
                </div>
            </div>
        </div>
    );
}

export default ChatWindowBig;