"use client"

import { useEffect, useState } from "react";

import Categories from "./Categories";
import ImageInput from "./ImageInput";
import TextInput from "./TextInput";
import { modelsList } from "@/data";


export default function InputWindow({setMessage}) {
    const [selectedMode, setSelectedMode] = useState("text");
    const [model, setModel] = useState(modelsList[0]);
    
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    useEffect(() => {
        setMessage(null);
    }, [selectedMode]);

    const handleCheckBtnClick = async (text) => {
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
                body: JSON.stringify({ text: text.trim(), model: model }),
            });
            const {message} = await response.json();
            setMessage(message);
            setResult(message.classification);
        } catch (error) {
            console.log("Error", error);
        } finally {
            setLoading(false);
        }
    }

    

  return (
    <section className="lg:w-[50%] h-[480px] flex flex-col items-center">

        {/* Category Selection */}
        <Categories selectedMode={selectedMode} setSelectedMode={setSelectedMode} />

        <h1 className="text-lg font-medium mt-2 text-center px-6">Analyze text or image to determine its authenticiy.</h1>

        {/* Text area */}
        { selectedMode === "text" && (
            <TextInput
            loading={loading}
            result={result}
            setResult={setResult}
            setMessage={setMessage}
            handleCheckBtnClick={handleCheckBtnClick}
            model={model}
            setModel={setModel}
            />
        )}

        {/* Image area */}
        { selectedMode == "image" && (
            <ImageInput 
            loading={loading}
            result={result}
            setResult={setResult}
            setMessage={setMessage}
            handleCheckBtnClick={handleCheckBtnClick}
            model={model}
            setModel={setModel}
            />
        )}
        
    </section>
  )
}
