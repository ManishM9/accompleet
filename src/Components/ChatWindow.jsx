import React, { useEffect, useState } from "react";

function ChatWindow(props) {
    const {setWinSel} = props;

    const [activeList, setActiveList] = useState([]);
    const [level, setLevel] = useState(null);

    const topics = [
        "Problem Description",
        "Examples & Test Cases",
        "Approach & Strategy",
        "Optimization & Complexity",
        "Debugging & Errors",
    ];

    const prompts = [
        [
            "Explain the problem in simple terms",
            "What is this question really asking?",
            "Can you simplify the constraints for me?",
            "How do I identify what data structure is needed?",
            "Is this similar to any well-known problem?",
        ],
        [
            "Walk me through the example input/output",
            "Can you show how this input is processed step by step?",
            "What are some edge cases I should test?",
            "Generate a few more test cases",
            "What kind of tricky inputs can cause bugs?",
        ],
        [
            "How do I start solving this?",
            "Should I try brute force first?",
            "What approach would work best for this?",
            "How do I decide on which approach to use?",
            "What's a good way to think about this problem?",
        ],
        [
            "What is the time complexity of my current approach?",
            "Can this be solved faster than O(n**2)?",
            "How do I reduce space complexity?",
            "Can we solve this with dynamic programming?",
            "Is there a way to avoid recursion here?",
        ],
        [
            "Why is my solution failing this test case?",
            "Explain why my output is wrong",
            "I get a TLE — how do I fix it?",
            "I don't know where my bug is — what should I do?",
            "Help me debug this part of the code",
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
                    console.log(`From Background: ${res.data.response}`);
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