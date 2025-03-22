
export default function OutputWindow({message}) {
  return (
    <section className="lg:w-[50%] h-[480px] flex flex-col items-center">
        <div className="h-21 hidden lg:flex flex-col justify-end">
        </div>

        <h2 className="text-lg font-medium mt-2 r px-2">Detail Response</h2>

        <div className="w-full h-full max-w-[90%] md:max-w-[70%] max-h-[55%] py-2">
            <textarea 
            name="outputText" 
            id="outputText"
            value={message}
            readOnly
            className={`w-full h-full p-2 rounded-lg resize-none outline-0 border border-gray-500/50`}
            />
        </div>

        <p className="text-xs text-text-muted text-center px-2">This tool can make mistake.</p>
    </section>
  )
}
