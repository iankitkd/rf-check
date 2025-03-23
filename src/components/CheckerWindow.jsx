"use client"

import { useState } from "react";

import { InputWindow, OutputWindow } from ".";

export default function CheckerWindow() {

  const [message, setMessage] = useState({});

  return (
    <main className="flex flex-col lg:flex-row min-h-[calc(100vh-40px)]">
      <InputWindow setMessage={setMessage} />
      { Object.keys(message).length != 0 && 
        <OutputWindow message={message} />
      }
    </main>
  )
}
