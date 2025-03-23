import { CiTextAlignLeft } from "react-icons/ci";
import { MdImage } from "react-icons/md";

const items = [
    {id: 1, title: "Text", mode: "text", Icon: CiTextAlignLeft},
    {id: 2, title: "Image", mode: "iamge", Icon: MdImage},
]

export default function Categories({selectedMode, setSelectedMode}) {
  return (
    <div className="flex items-center gap-3 p-2 h-21">
        {
            items.map((ele, index) => (
                <>
                    <button 
                    key={ele.id}
                    onClick={() => setSelectedMode(ele.mode)}
                    className={`flex flex-col items-center cursor-pointer hover:bg-zinc-700 min-w-16 py-1 rounded-lg 
                            ${selectedMode == ele.mode && "bg-zinc-700"}`}
                    >
                        <ele.Icon size={32} className="p-1 bg-background-card rounded-lg mb-0.5" />
                        <span>{ele.title}</span>
                    </button>

                    {index != items.length-1 && (<span className="px-2 text-sm font-medium text-gray-500 ">OR</span>)}
                </>
            ))
        }
        
    </div>
  )
}
