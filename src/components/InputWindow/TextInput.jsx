import { useState } from "react";

import CheckButton from "./CheckButton";

const borderColors = {
    "": "border-gray-500/50",
    "real": "border-green-500",
    "fake": "border-red-500",
    "half-truth": "border-orange-500",
    "neutral": "border-gray-500",
}

export default function TextInput({loading, result, setResult, setMessage, handleCheckBtnClick}) {
    const [text, setText] = useState("");

    const handleTextChange = (e) => {
        setText(e.target.value);
        setResult("");
        setMessage("");
    }

  return (
    <>
        <div className="w-full h-full max-w-[90%] md:max-w-[70%] max-h-[55%] py-2">
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
            <CheckButton loading={loading} handleCheckBtnClick={() => handleCheckBtnClick(text)} />
        )}
    </>
  )
}
