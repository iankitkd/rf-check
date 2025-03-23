"use client"

import { useState } from "react";

import CheckButton from "./CheckButton";
import Categories from "./Categories";

const customColors = {
    "": "border-gray-500/50",
    "real": "border-green-500",
    "fake": "border-red-500",
    "half-truth": "border-orange-500",
    "neutral": "border-gray-500",
}

export default function InputWindow({setMessage}) {
    const [selectedMode, setSelectedMode] = useState("text");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [isButtonAvailable, setIsButtonAvailable] = useState(false);
    
    const handleCheckBtnClick = async () => {
        if(!text.trim()) {
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`/api/check`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: text.trim() }),
            });
            const {message} = await response.json();
            setMessage(message);
            setResult(message.classification);
        } catch (error) {
            console.log("Error", error);
        } finally {
            setIsButtonAvailable(false);
            setLoading(false);
        }
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
        setResult("");
        setMessage("");
        setIsButtonAvailable(true);
    }

  return (
    <section className="lg:w-[50%] h-[480px] flex flex-col items-center">

        {/* Category Selection */}
        <Categories selectedMode={selectedMode} setSelectedMode={setSelectedMode} />

        <h2 className="text-lg font-medium mt-2 text-center px-6">Analyze text or image to determine its authenticiy.</h2>

        {/* Text area */}
        { selectedMode === "text" && (
            <div className="w-full h-full max-w-[90%] md:max-w-[70%] max-h-[55%] py-2">
                <textarea 
                name="inputText" 
                id="inputText"
                placeholder="Enter text here, let's check if it's real or fake !" 
                value={text}
                onChange={handleTextChange}
                className={`w-full h-full p-2 rounded-lg resize-none outline-0 border-2 ${customColors[result]}`}
                />
            </div>
        )}

        {/* Image area */}
        { selectedMode == "image" && (
            <div className="w-full h-full max-w-[90%] md:max-w-[70%] max-h-[50%] py-2">

            </div>
        )}

        {/* Check Button */}
        {isButtonAvailable && text && (
            <CheckButton loading={loading} handleCheckBtnClick={handleCheckBtnClick} />
        )}
    </section>
  )
}
