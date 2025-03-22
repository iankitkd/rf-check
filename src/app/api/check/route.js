import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY;

// const text = "earth is flat"

const prompt = `Task: Analyze the given text and return a JavaScript object with responses to the following questions:
1: Determine if the text is fact-based or opinion-based (respond with one word: "fact" or "opinion").
2: If the text is fact-based, rate its accuracy on a scale from 0 to 100 (0 = completely false, 100 = completely true).
3: Categorize the text as one of the following: "real", "fake", "half-truth", or "neutral" (if unsure).
4: Provide a detailed explanation for your rating and classification in a natural manner, avoiding any reference to the prompt.
The format of response should be exactly like this: 
{
    "1": "fact" | "opinion",
    "2": (number from 0 to 100) | null, 
    "3": "real" | "fake" | "half-truth" | "neutral",
    "4": "Your detailed reasoning here..."
}`;


export async function POST(request) {
    try {
        const { text } = await request.json()
        console.log(text, "in api")

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "deepseek/deepseek-r1:free",
              "messages": [
                {
                  "role": "user",
                  "content": `Text: ${text} \n${prompt}`
                }
              ]
            })
        });

        const data = await response.json();
        const rawString = data.choices[0].message.content;
        const jsonString = rawString.replace(/```javascript|```/g, "").trim().replace(/```json|```/g, "").trim();
        const message = JSON.parse(jsonString);
        console.log(message, "api");

        return NextResponse.json({ message }, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}