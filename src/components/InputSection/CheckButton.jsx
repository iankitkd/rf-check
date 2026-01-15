
import { BsStars } from "react-icons/bs";

export default function CheckButton({loading, loadingText="Analyzing...", handleCheckBtnClick}) {
  return (
    <div>
        <button 
        className="py-2 px-8 text-lg rounded-lg bg-button hover:bg-button-hover text-button-text"
        onClick={handleCheckBtnClick}
        disabled={loading}
        >
            {!loading ? 
            <span className="flex items-center gap-1"><BsStars /> <p>Check Now</p></span> 
            : <p>{loadingText}</p>
            }
        </button>
    </div>
  )
}
