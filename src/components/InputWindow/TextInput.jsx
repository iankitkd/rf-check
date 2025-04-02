import { useState } from "react";

import CheckButton from "./CheckButton";

const borderColors = {
    "": "border-gray-500/50",
    "real": "border-green-500",
    "fake": "border-red-500",
    "half-truth": "border-orange-500",
    "neutral": "border-gray-500",
}

export default function TextInput({loading, result, setResult, setMessage, handleCheckBtnClick, model, setModel}) {
    const [text, setText] = useState("");

    const handleTextChange = (e) => {
        setText(e.target.value);
        setResult("");
        setMessage("");
    }

  return (
    <>
        <div className="w-full h-full max-w-[90%] md:max-w-[70%] max-h-[55%]">
            <textarea 
            name="inputText" 
            id="inputText"
            placeholder="Enter text here, let's check if it's real or fake!" 
            value={text}
            onChange={handleTextChange}
            className={`w-full h-full p-2 rounded-lg bg-background-card shadow-md shadow-shadow resize-none outline-0 border-2 ${borderColors[result]}`}
            />
        </div>

        {!result && text && (
            <div className="relative flex items-center">
                <CheckButton loading={loading} handleCheckBtnClick={() => handleCheckBtnClick(text)} />

                <div className="absolute left-full ml-2">
                    <select
                        id="model"
                        value={model}
                        className="text-[10px] outline-0 bg-background-card hover:bg-background-card-hover border border-border p-1 rounded-lg"
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <option value="deepseek">Deepseek</option>
                        <option value="gemini">Gemini</option>
                    </select>
                </div>
            </div>
        )}
    </>
  )
}
