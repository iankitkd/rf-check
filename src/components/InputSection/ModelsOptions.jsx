import React from 'react'

export default function ModelsOptions({model, setModel}) {
  return (
    <div className="absolute left-full ml-2">
        <select
            id="model"
            value={model}
            className="relative text-[10px] outline-0 bg-background-card hover:bg-background-card-hover border border-border p-1 rounded-lg"
            onChange={(e) => setModel(e.target.value)}
        >
            <option value="deepseek">Deepseek</option>
            <option value="gemini">Gemini</option>
        </select>
    </div>
  )
}
