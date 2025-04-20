import express, { response } from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Gem_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(Gem_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function getAIRes(promptContext) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are 'Accompleet', an expert competitive programmer helping someone understand, learn and code a leetcode problem.
    You are to be friendly and polite. You will appreciate what the user has done right, and you will suggest/answer/help on what the user can improve on or do better.
    Let your response be capped to 1000 characters + 100 lines of code(if applicable).
    <MORE STUFF>
    The context of the LeetCode problem, question(from user related to the problem) and user's code(will be provided if applicable) will be given below, if it contains anything that does not relate to LeetCode or competitive coding or syntax doubts relating to the question, or if there is anything inappropriate, please politely decline to answer and just return a simple response something along the lines of 'Please ask relevant questions only' or something similar and do not entertain or answer further.
    `+promptContext;

    console.log(prompt);
    return "LALA";
  
    const result = await model.generateContent(prompt.trim());
    // console.log(result);
    console.log(result.response.text());
    return result.response.text();
}

// USAGE EXAMPLE
// try {
//     const aiReply = await getAIRes("What are your capabilties. What can you help me with using this API?");
// } catch (error) {
//     console.error("Gemini Error: ", error.message);
// }

app.post("/api/prompt", async (req, res) => {
    if (req.body.prompt.length > 2000) {
        res.status(400).json({ response: "ERROR" });
    }
    const { topic, promptNum, prompt } = req.body;
    console.log(topic, promptNum, prompt);

    try {
        const aiReply = await getAIRes(prompt);
        res.status(200).json({ response: aiReply });
    } catch (error) {
        console.error('Gemini ERROR: ', error.message);
        res.status(500).json({ response: "ERROR" });
    }
});

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});