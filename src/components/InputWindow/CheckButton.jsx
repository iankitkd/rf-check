
import { BsStars } from "react-icons/bs";

export default function CheckButton({loading, handleCheckBtnClick}) {
  return (
    <div>
        <button 
        className="py-2 px-3 rounded-lg bg-background-card hover:bg-zinc-700"
        onClick={handleCheckBtnClick}
        disabled={loading}
        >
            {!loading ? 
            <span className="flex items-center gap-1"><BsStars /> <p>Check Now</p></span> 
            : <p>Analyzing ...</p>
            }
        </button>
    </div>
  )
}
