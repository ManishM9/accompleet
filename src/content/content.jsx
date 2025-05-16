import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import ChatWindow from "../Components/ChatWindow";
import ChatWindowBig from "../Components/ChatWindowBig";
import { DndContext, useSensor, useSensors, PointerSensor, useDraggable } from "@dnd-kit/core";

function ChatWidget() {
    const [logoUrl, setLogoUrl] = useState(null);
    const [winSel, setWinSel] = useState(0);
    const [bigWinOpen, setBigWinOpen] = useState(false);
    const [messages, setMessages] = useState([{from : "accompleet", text : "Hi! I am Accompleet! Choose an option in the previous menu or enter your doubt here!"}]);

    const leaveTimeout = useRef(null);

    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: "accompleet-icon" });

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5,
        },
    }));

    const handleDragStart = () => {
        setDragging(true);
        console.log("START");
    };

    const handleDragEnd = (e) => {
        const { delta } = e;
        setPosition((prev) => {
            const x = Math.min( Math.max(prev.x + delta.x, 20), window.innerWidth - 50 );
            const y = Math.min( Math.max(prev.y + delta.y, 20), window.innerHeight - 50 );
            return {x,y};
        });
        setDragging(false);

    };

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
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div ref={setNodeRef} {...attributes} {...listeners} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{
                position: "fixed",
                left: position.x,
                top: position.y,
            }} className="z-[9999] flex items-end space-x-2">
                {winSel==1 && <ChatWindow setWinSel={setWinSel} sendPrompt={sendPrompt} />}
                {winSel==2 && <ChatWindowBig setWinSel={setWinSel} messages={messages} sendPrompt={sendPrompt} />}
                <div onClick={()=>{if(!dragging)toggleIsOpen()}} className="bottom bg-blue-100 rounded-2xl shadow-md p-4 w-14 h-14 cursor-pointer flex items-center justify-center">
                    {logoUrl && <img className="w-full h-full object-contain" alt="Chat Icon" src={logoUrl} />}
                </div>
            </div>
        </DndContext>
    );
}

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<ChatWidget />);

export default ChatWidget;