import React from "react";
import { createRoot } from "react-dom/client";

function ChatWidget() {
    return (
        <div className="fixed bottom-4 right-4 z-[9999] bg-blue rounded-lg shadow-lg p-4 w-80 h-96">
            <h1 className="text-lg font-bold">Chat Assistant</h1>
            <div className="mt-2">Ask me anything about your code...</div>
        </div>
    );
}

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<ChatWidget />);