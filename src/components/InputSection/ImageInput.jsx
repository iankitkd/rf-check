import Tesseract from "tesseract.js";
import { useState } from "react";

import CheckButton from "./CheckButton";
import ModelsOptions from "./ModelsOptions";
import { preprocessImage } from "@/utils/preprocessImage";

const borderColors = {
    "": "border-gray-500/50",
    "real": "border-green-500",
    "fake": "border-red-500",
    "half-truth": "border-orange-500",
    "neutral": "border-gray-500",
}

export default function ImageInput({loading, result, setResult, setMessage, handleCheckBtnClick, model, setModel}) {
    const [image, setImage] = useState("");
    const [loadingExtract, setLoadingExtract] = useState(false);

    const { createWorker } = Tesseract;

    const handleFileChange = async (e) => {
        setImage("");
        setResult("");
        setMessage("");
        setLoadingExtract(false);

        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        if(!selectedFile.type.startsWith("image/")) {
            return;
        }
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase(); 
        if(!["bmp", "jpg", "jpeg", "png", "pbm", "webp"].includes(fileExtension)) {
            return;
        }
        setImage(URL.createObjectURL(selectedFile));
    };

    const extractText = async () => {
        if (!image) return;
        try {
            setLoadingExtract(true);
            const processedImage = await preprocessImage(image);
            const worker = await createWorker('eng');
            const { data: { text } } = await worker.recognize(processedImage);
            console.log("text", text);
            return text;
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingExtract(false);
        }
    };

    const handleImageAnalysis = async () => {
        const text = await extractText();
        if(!text.trim()) {
            return;
        }
        handleCheckBtnClick(text);
    }
     

  return (
    <>
    <div className={`w-full h-full max-w-[90%] md:max-w-[70%] max-h-[55%] py-2 bg-background-card relative border-2 border-gray-500/50 rounded-lg ${borderColors[result]}`}>
        <label htmlFor="file" className={`flex justify-center ${image && "absolute -bottom-20 left-1/2 -translate-x-1/2 text-xs opacity-70"}`}>
            <h2 className="bg-background hover:bg-background-card-hover border border-border shadow-lg w-fit p-2 rounded-lg cursor-pointer">
                {!image ? "Choose Image" : "Change Image"}
            </h2>
            <input type="file" id="file" onChange={handleFileChange} hidden />
        </label>
        { image && (
            <div className="p-2 w-full h-full flex items-center justify-center">
                <img
                src={image}
                alt="Choosen Image"
                className="max-w-full max-h-full object-cover rounded-lg"
                />
            </div>
        )}
    </div>

    { image && !result && (
    <div className="relative flex items-center">
        <CheckButton 
        loading={loading || loadingExtract} 
        loadingText={loadingExtract ? "Extracting Text..." : "Analyzing..."} 
        handleCheckBtnClick={handleImageAnalysis} 
        />
        <ModelsOptions model={model} setModel={setModel} />
    </div>
    )}
    </>
  )
}
