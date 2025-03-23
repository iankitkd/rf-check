import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY;

// const text = "earth is flat"

const prompt = `Task: Analyze the given text and return a JSON output with responses to the following questions:
  type: Determine if the text is fact-based or opinion-based (respond with one word: "fact" or "opinion").
  score: If the text is fact-based, rate its accuracy on a scale from 0 to 100 (0 = completely false, 100 = completely true).
  classification: Categorize the text as one of the following: "real", "fake", "half-truth", or "neutral" (if unsure).
  justification: Provide a detailed explanation for your score and classification only in a natural manner, avoiding any reference to the promp, return in markdown format making it easy to read with headings, bullet points.
  sourceURL: If possible links to original sources for verification.
  confidenceLevel: Indicates how sure the system is about the classification.
  category: Classifies the type of content being analyzed.
  keywords: Relevant keywords that define the claim.
Return the response in valid JSON format exactly as follows (not make this response markdown): 
{
    "type": "fact" | "opinion",
    "score": (number from 0 to 100) | null, 
    "classification": "real" | "fake" | "half-truth" | "neutral",
    "justification": "Your detailed reasoning here...",
    "sourceURL": "source_url" | null,  
    "confidenceLevel": "high" | "medium" | "low",  
    "category": "news" | "social_media" | "scientific" | "historical" | "other as per you categorise",  
    "keywords": ["relevant_keywords"],  
}`;


export async function POST(request) {
    try {
        const { text } = await request.json()

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
        console.log(rawString, "api");
        if(!rawString) {
          return NextResponse.json({error: "No response found"}, {status: 500});
        }
        const jsonString = rawString.replace(/```json|```/g, "").trim();
        const message = JSON.parse(jsonString);

        return NextResponse.json({ message }, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}