"use client"

import { useState } from "react";

import { CiTextAlignLeft } from "react-icons/ci";
import { MdImage } from "react-icons/md";
import { BsStars } from "react-icons/bs";

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
    const [isOpinionBased, setIsOpinionBased] = useState(false);
    
    const handleCheckBtnClick = async () => {
        if(!text.trim()) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`/api/check`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: text.trim() }),
            });
            const {message} = await response.json();
            setResult(message[3])
            setMessage(message[4]);
            if(message[1] !== "fact") {
                setIsOpinionBased(true);
            }
            console.log(message, "res client")
        } catch (error) {
            console.log("Error", error);
        }
       
        setLoading(false);
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
        setResult("");
        setMessage("");
    }

  return (
    <section className="lg:w-[50%] h-[480px] flex flex-col items-center">

        {/* Category Selection */}
        <div className="flex items-center gap-3 p-2 h-21">
            <button 
            className={`flex flex-col items-center cursor-pointer hover:bg-zinc-700 min-w-16 py-1 rounded-lg 
                    ${selectedMode == "text" && "bg-zinc-700"}`}
            onClick={() => setSelectedMode("text")}
            >
                <CiTextAlignLeft size={32} className="p-1 bg-background-card rounded-lg mb-0.5" />
                <span>Text</span>
            </button>

            <span className="px-2 text-sm font-medium text-gray-500 ">OR</span>

            <button 
            className={`flex flex-col items-center cursor-pointer hover:bg-zinc-700 min-w-16 py-1 rounded-lg 
                    ${selectedMode == "image" && "bg-zinc-700"}`}
            onClick={() => setSelectedMode("image")}
            >
                <MdImage size={32} className="p-1 bg-background-card rounded-lg mb-0.5" />
                <span>Image</span>
            </button>
        </div>

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
        {text && (
            <div>
                <button 
                className="py-2 px-3 rounded-lg bg-background-card hover:bg-zinc-700"
                onClick={handleCheckBtnClick}
                disabled={loading}
                >
                    {!loading ? 
                    <span className="flex items-center gap-1"><BsStars /> <p>Check Now</p></span> 
                    : <p>Analyzing ...</p>
                    }
                </button>
            </div>
        )}
    </section>
  )
}
