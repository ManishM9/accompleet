import express, { response } from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { cacheResponse, getCachedResponse } from './cache.js';

dotenv.config();

const Gem_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(Gem_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function getAIResponse(promptContext) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are 'Accompleet', an expert competitive programmer helping someone understand, learn and code a leetcode problem.
    You are to be friendly and polite. You will appreciate what the user has done right, and you will suggest/answer/help on what the user can improve on or do better.
    Let your response be capped to 1000 characters + 100 lines of code(if applicable).
    <MORE STUFF>
    The context of the LeetCode problem, question(from user related to the problem) and user's code(will be provided if applicable) will be given below, if it contains anything that does not relate to LeetCode or competitive coding or syntax doubts relating to the question, or if there is anything inappropriate, please politely decline to answer and just return a simple response something along the lines of 'Please ask relevant questions only' or something similar and do not entertain or answer further.
    `+promptContext;

    const result = await model.generateContent(prompt.trim());
    return result.response.text();
}

async function getProblemDescription(slug) {
    const response = await fetch(process.env.LEETCODE_GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query getProblemDetail($titleSlug: String!) {
                question(titleSlug: $titleSlug) {
                    content
                }
            }`,
            variables: { titleSlug: slug }
        })
    });
    const data = await response.json();
    return data?.data?.question?.content || "Description not found";
}


app.post("/api/prompt", async (req, res) => {
    
    const { problemSlug, promptType } = req.body;
    try {
        const cachedResponse = await getCachedResponse(problemSlug, promptType);

        //Check Cache
        if (cachedResponse) {
            console.log(`Cache hit for ${problemSlug}:${promptType}`);
            return res.status(200).json({ response: cachedResponse });
        }
        
        
        //Generate on Cache Miss
        const description = await getProblemDescription(problemSlug);
        
        const promptContext = `Problem Slug: ${problemSlug}. Description: ${description}. Prompt: ${promptType}`;
        const aiResponse = await getAIResponse(promptContext);

        //Cache the Response
        await cacheResponse(problemSlug, promptType, aiResponse);

        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error('Error handling prompt:', error.message);
        res.status(500).json({ response: "ERROR" });
    }
});



app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});