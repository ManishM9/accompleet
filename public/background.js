chrome.runtime.onInstalled.addListener(() => {
    console.log("Accompleet Accomplished!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log(`Sender: ${JSON.stringify(sender)}, Message: ${JSON.stringify(message)}`);
    console.log(`Message: ${JSON.stringify(message)}`);

    if (message.type === "PROMPT SEL") {
        fetch("http://localhost:3000/api/prompt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic: message.topic,
                promptNum: message.promptNum,
                prompt: message.prompt
            })
        }).then(res => res.json())
        .then(data => {
            console.log("Received from Node Server: ", data);
            sendResponse({ success: true, data });
        }).catch(error => {
            console.log("ERROR SENDING POST: ", error);
            sendResponse({ success: false, error: error.message });
        });
        
        return true;
    }
});