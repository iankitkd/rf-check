import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { models } from "@/data";

const API_KEY = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// const text = "earth is flat"

const prompt = `Task: Analyze the given text and return a JSON output with responses to the following questions:
  type: Determine if the text is fact-based or opinion-based (respond with one word: "fact" or "opinion").
  score: If the text is fact-based, rate its accuracy on a scale from 0 to 100 (0 = completely false, 100 = completely true).
  classification: Categorize the text as one of the following: "real", "fake", "half-truth", or "neutral" (if unsure).
  justification: "Provide a detailed explanation for your score and classification in a natural manner, avoiding any reference to the prompt. Return as a single-line string using \\n for line breaks and markdown format making it easy to read with headings, bullet points. Ensure the output is valid JSON - no literal newlines."
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
        const { text, model } = await request.json()

        let message = "";
        if(model === "Google: Gemini") {
          message = await geminiCheck(text);
        } 
        else if(models[model]) {
          console.log(models[model])
          message = await openRouterCheck(text, models[model]);
        }
        else {
          return NextResponse.json({error: "Invalid model"}, {status: 400});
        }

        return NextResponse.json({ message }, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

async function openRouterCheck(text, model) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "X-Title": "RF Check",
        },
        body: JSON.stringify({
          "model": `${model}`,
          "messages": [
            {
              "role": "user",
              "content": `Text: ${text} \n${prompt}`
            }
          ]
        })
    });
    const data = await response.json();
    console.log(data);
    const rawString = data.choices[0].message.content;
    console.log(rawString, "api");
    if(!rawString) {
      return NextResponse.json({error: "No response found"}, {status: 500});
    }
    const jsonString = rawString.replace(/```json|```/g, "").trim();
    const message = JSON.parse(jsonString);
    return message;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function geminiCheck(text) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Text: ${text} \n${prompt}`,
    });
    const rawString = response.text;
    console.log(rawString, "gemini");
    if(!rawString) {
      return NextResponse.json({error: "No response found"}, {status: 500});
    }
    const jsonString = rawString.replace(/```json|```/g, "").trim();
    const message = JSON.parse(jsonString);
    return message;
  } catch (error) {
    throw new Error(error);
  }
    
}