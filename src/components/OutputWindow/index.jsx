import ReactMarkdown from "react-markdown"

import Rating from "./Rating";

const code = {
  "": 0,
  "real": 1,
  "fake": 2,
  "half-truth": 3,
  "neutral": 4,
}

const colors = {
  "": "bg-gray-500/50",
  "real": "bg-green-600",
  "fake": "bg-red-600",
  "half-truth": "bg-orange-600",
  "neutral": "bg-gray-600",
}

export default function OutputWindow({message}) {
  const {type, score, classification, justification, sourceURL, confidenceLevel, category, keywords} = message;
  console.log(message);

  return (
    <section className="lg:w-[50%] h-[calc(100vh-40px)] flex flex-col items-center">
        <div className="h-21 w-full px-2 flex items-center justify-around gap-1">
          <div className={`font-semibold text-lg capitalize  px-4 py-1 rounded-lg ${colors[classification]}`}>{classification}</div>
          {type === "opinion" && (<div className={`font-semibold text-lg capitalize px-4 py-1 rounded-lg bg-gray-500/50`}>{type}</div>)}
          {score && (
            <div className="flex flex-col items-center justify-center">
              <Rating rating={score} color={code[classification]} />
              <h2 className="text-sm font-semibold">Score</h2>
            </div>
          )}
        </div>

        <h2 className="text-lg font-medium mt-2 r px-2">Detail Response</h2>

        <div className="w-full h-fit max-w-[90%] md:max-w-[70%] max-h-[45%] py-2">
          <div className={`w-full h-full p-2 rounded-lg border border-gray-500/50 overflow-y-auto`}>
            <ReactMarkdown>
              {justification}
            </ReactMarkdown>
          </div>
        </div>

        <div className="w-full max-w-[90%] md:max-w-[70%] p-2 flex flex-col gap-1">
          {sourceURL && (
            <div className="flex gap-2 items-center">
              <span>Source:</span>
              <a href={sourceURL} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">Source</a>
            </div>
          )}

          { category && (
              <div className="flex gap-2 items-center">
                <span>Category:</span>
                <span className="capitalize">{category}</span>
              </div>
          )}
          { keywords && (
              <div className="flex gap-2 items-start">
                <span>Keywords:</span>
                <div className="flex gap-1 flex-wrap">
                  { keywords.map((ele) => (<span key={ele} className="text-sm h-fit bg-background-card px-1 rounded-lg capitalize">{ele}</span>))
                  }
                </div>
              </div>
          )}

        </div>

        <p className="text-xs text-text-muted text-center px-2">This tool can make mistake.</p>
    </section>
  )
}
