chrome.runtime.onInstalled.addListener(() => {
    console.log("Accompleet Accomplished!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(`Sender: ${JSON.stringify(sender)}, Message: ${JSON.stringify(message)}`);

    if (message.type === "PROMPT SEL") {
        sendResponse({ reply: "RECEIVED!" });
    }

    return true;
});