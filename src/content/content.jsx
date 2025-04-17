import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import ChatWindow from "../Components/ChatWindow";

function ChatWidget() {
    const [logoUrl, setLogoUrl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

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
        setIsOpen((prev) => !prev);
    }

    const handleMouseLeave = () => {
        leaveTimeout.current = setTimeout(() => {
            setIsOpen(false);
        }, 400);
    };

    const handleMouseEnter = () => {
        if (leaveTimeout.current) {
            clearTimeout(leaveTimeout.current);
        }
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="fixed bottom-4 right-4 z-[9999] flex items-end space-x-2">
            {isOpen && <ChatWindow setIsOpen={setIsOpen} />}
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