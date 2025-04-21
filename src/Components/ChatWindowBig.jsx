import React, {useState} from "react";

function ChatWindowBig(props) {
    const {setWinSel} = props;
    const [messages, setMessages] = useState([{from : "accompleet", text : "Hi! I am accompleet bot! There to help"}]);
    const [input, setInput] = useState("");
    
    const handleSend = () => {
        const trimmedInput = input.trim();
        if (trimmedInput === "") return;
        const updatedMessages = [...messages, {from: "user", text: trimmedInput}];
        setMessages(updatedMessages);
        setInput("");
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                { from: "accompleet", text: "API hit check!" }
            ]);
        }, 600);
    }

    return (
        <div className="w-96 h-[32rem] bg-green-100 text-black flex flex-col rounded shadow-lg">
           <div className="flex items-center justify-between h-10 w-full bg-yellow-100 px-2">
                <button className="bg-red-100 px-2 py-1 text-sm rounded" onClick={() => setWinSel(1)}>Back</button>
                <button className="bg-red-100 px-2 py-1 text-sm rounded" onClick={() => setWinSel(0)}>X</button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {
                messages.map((msg, index) =>
                    <div key={index} className={`flex items-end ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                    {/* AI Image */}
                    {msg.from === "accompleet" && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 text-sm">🤖</div>
                    )}

                    {/* Message  */}
                    <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm break-words ${msg.from === "user" ? "bg-blue-300" : "bg-white"}`}>
                        {msg.text}
                    </div>

                    {/* User ]Image */}
                    {msg.from === "user" && (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2 text-white text-sm">🧑</div>
                    )}
                    </div>
                )
                }
            </div>
            <div className="p-2 bg-white flex gap-2">
                <input
                    className="flex-1 p-2 border border-gray-300 rounded text-black"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="px-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default ChatWindowBig;