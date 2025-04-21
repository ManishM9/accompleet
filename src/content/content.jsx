import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import ChatWindow from "../Components/ChatWindow";
import ChatWindowBig from "../Components/ChatWindowBig";

function ChatWidget() {
    const [logoUrl, setLogoUrl] = useState(null);
    const [winSel, setWinSel] = useState(0);
    const [bigWinOpen, setBigWinOpen] = useState(false);
    const [messages, setMessages] = useState([{from : "accompleet", text : "Hi! I am Accompleet! Choose an option in the previous menu or enter your doubt here!"}]);

    const leaveTimeout = useRef(null);

    useEffect(() => {
        if (typeof chrome !== "undefined" && chrome.runtime?.getURL) {
            const url = chrome.runtime.getURL("Icons/people_logo.png");
            setLogoUrl(url);
        } else {
            setLogoUrl("Icons/people_logo.png");
        }
    }, []);

    const toggleIsOpen = () => {
        if (winSel===0) {
            if (bigWinOpen){
                setWinSel(2);
            } else {
                setWinSel(1);
            }
        } else {
            setWinSel(0);
        }
    }

    useEffect(() => {
        if (winSel===2) {
            setBigWinOpen(true);
        } else if (winSel===1) {
            setBigWinOpen(false);
        }
    }, [winSel]);

    const handleMouseLeave = () => {
        leaveTimeout.current = setTimeout(() => {
            setWinSel(0);
        }, 400);
    };

    const handleMouseEnter = () => {
        if (leaveTimeout.current) {
            clearTimeout(leaveTimeout.current);
        }
    };

    const sendPrompt = (query) => {
        const titleProblem = document.querySelector('a[href^="/problems/"][class*="cursor-text"]')?.innerText;
        const descriptionElem = document.querySelector('[data-track-load="description_content"]');
        const descriptionText = descriptionElem?.innerText;

        setMessages((prev) => [...prev, {from: "user", text: query}]);

        if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
            chrome.runtime.sendMessage({ type: "PROMPT SEL", prompt: query, titleProblem, descriptionText }, (res) => {
                console.log(`From Background: ${res.data.response}`);
                setMessages((prev) => [...prev, {from: "accompleet", text: res.data.response}]);
            });
        }

        setBigWinOpen(true);
        setWinSel(2);
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="fixed bottom-4 right-4 z-[9999] flex items-end space-x-2">
            {winSel==1 && <ChatWindow setWinSel={setWinSel} sendPrompt={sendPrompt} />}
            {winSel==2 && <ChatWindowBig setWinSel={setWinSel} messages={messages} sendPrompt={sendPrompt} />}
            <div onClick={toggleIsOpen} className="bottom bg-blue-100 rounded-2xl shadow-md p-4 w-14 h-14 cursor-pointer flex items-center justify-center">
                {logoUrl && <img className="w-full h-full object-contain" alt="Chat Icon" src={logoUrl} />}
            </div>
        </div>
    );
}

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<ChatWidget />);

export default ChatWidget;