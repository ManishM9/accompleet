import React, { useEffect, useState } from "react";

function ChatWindow(props) {
    const {setWinSel} = props;

    const [activeList, setActiveList] = useState([]);
    const [level, setLevel] = useState(null);

    const topics = [
        "Description",
        "Test cases",
        "Code",
        "Lala",
        "Lala2",
        "Lala3",
        "Lala4"
    ];

    const prompts = [
        [
            "Prompt1",
            "Prompt2",
            "Prompt3",
            "Prompt4",
            "Prompt5",
        ],
        [
            "Prompt6",
            "Prompt7",
            "Prompt8",
            "Prompt9",
            "Prompt10",
        ],
        [
            "Prompt11",
            "Prompt12",
            "Prompt13",
            "Prompt14",
            "Prompt15",
        ],
        [
            "Prompt16",
            "Prompt17",
            "Prompt18",
            "Prompt19",
            "Prompt20",
        ],
        [
            "Prompt1",
            "Prompt2",
            "Prompt3",
            "Prompt4",
            "Prompt5",
        ],
        [
            "Prompt6",
            "Prompt7",
            "Prompt8",
            "Prompt9",
            "Prompt10",
        ],
        [
            "Prompt11",
            "Prompt12",
            "Prompt13",
            "Prompt14",
            "Prompt15",
        ],
        [
            "Prompt16",
            "Prompt17",
            "Prompt18",
            "Prompt19",
            "Prompt20",
        ],
        [
            "Prompt1",
            "Prompt2",
            "Prompt3",
            "Prompt4",
            "Prompt5",
        ],
    ];

    useEffect(() => {
        if (level === null) {
            setActiveList(topics);
        } else {
            setActiveList(prompts[level]);
        }
    }, [level]);

    const handleClick = (e) => {
        let val = Number(e.target.value);
        if (level === null) {
            setLevel(val);
        } else {
            console.log(`Prompt selected is: ${level},${val} | ${prompts[level][val]}`);
            setLevel(null);
            if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
                chrome.runtime.sendMessage({ type: "PROMPT SEL", topic: level, promptNum: val, prompt: prompts[level][val] }, (res) => {
                    console.log(`From Background: ${res.reply}`);
                });
            }
        }
    }

    return (
        <div className="w-40 h-64 bg-green-100 text-black flex flex-col">
            <div className="flex flex-row h-10 w-full bg-yellow-100">
                {level!==null && <button className="items-start bg-red-100 p-2" onClick={() => setLevel(null)}>Back</button>}
                <div className="flex flex-row ml-auto space-x-1">
                    <button className="bg-orange-100 p-2" onClick={() => setWinSel(2)}>Chat</button>
                    <button className="bg-red-100 p-2" onClick={() => setWinSel(0)}>X</button>
                </div>
            </div>
            
            {/* Topics & Prompts part */}
            <div className="flex-grow m-2 bg-red-200 overflow-x-hidden overflow-y-auto rounded-md">
                <ul className="w-full h-fit bg-blue-100 space-y-2">
                    {activeList.map((ele, index) => (
                        <li key={index} value={index} onClick={handleClick} className="rounded-md bg-yellow-100 cursor-pointer">{ele}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChatWindow;