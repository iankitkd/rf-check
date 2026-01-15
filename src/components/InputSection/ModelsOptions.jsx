import { models, modelsList } from '@/data'
import React from 'react'

export default function ModelsOptions({model, setModel, loading}) {
  return (
    <div className="">
      <select
        id="model"
        value={model}
        disabled={loading}
        className="relative text-[12px] outline-0 bg-background-card hover:bg-background-card-hover border border-border p-2 rounded-lg"
        onChange={(e) => setModel(e.target.value)}
      >
        {
          modelsList.map((el) => (
            <option key={el} value={el}>{el}</option>
          ))
        }
      </select>
    </div>
  )
}
