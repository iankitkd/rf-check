import { useState } from "react";

export default function ImageInput({setText, setIsButtonAvailable}) {
    const [file, setFile] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        if(!selectedFile.type.startsWith("image/")) {
            return;
        }
        setFile(URL.createObjectURL(selectedFile));
        extractText();
    };

    const extractText = () => {
        setIsButtonAvailable(true);
    }

  return (
    <div className="w-full h-full max-w-[90%] md:max-w-[70%] max-h-[55%] py-2 bg-background-card relative">
        <label htmlFor="file" className={`flex justify-center ${file && "absolute -bottom-20 left-1/2 -translate-x-1/2 text-xs opacity-70"}`}>
            <h2 className="bg-background hover:bg-background-card-hover border border-border shadow-lg w-fit p-2 rounded-lg cursor-pointer">
                {!file ? "Choose Image" : "Change Image"}
            </h2>
            <input type="file" id="file" onChange={handleFileChange} hidden />
        </label>
        { file && (
            <div className="p-2 w-full h-full flex items-center justify-center">
                <img
                src={file}
                alt="Choosen Image"
                className="max-w-full max-h-full object-cover rounded-lg"
                />
            </div>
        )}
    </div>
  )
}
