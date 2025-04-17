import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function ChatWidget() {
    const [logoUrl, setLogoUrl] = useState("Icons/people_logo.png");

    useEffect(() => {
        if (typeof chrome !== "undefined" && chrome.runtime?.getURL) {
            const url = chrome.runtime.getURL("Icons/people_logo.png");
            setLogoUrl(url);
        }
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-[9999] bg-blue-100 rounded-2xl shadow-md p-4 w-14 h-14">
            {logoUrl && <img className="w-fit h-fit" src={logoUrl} />}
        </div>
    );
}

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<ChatWidget />);

export default ChatWidget;