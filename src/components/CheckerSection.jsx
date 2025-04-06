"use client"

import { useState } from "react";

import { InputSection, OutputSection } from ".";

export default function CheckerWindow() {

  const [message, setMessage] = useState({});

  return (
    <main className="flex flex-col lg:flex-row min-h-[calc(100vh-40px)]">
      <InputSection setMessage={setMessage} />
      { message && Object.keys(message).length != 0 && 
        <OutputSection message={message} />
      }
    </main>
  )
}
