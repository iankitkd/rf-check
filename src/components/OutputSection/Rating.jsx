
export default function Rating({rating, color}) {
    const strokeOffset = 100 - rating;

    var circleColor = "stroke-gray-500";
    var offsetCircleColor = "stroke-gray-100"
    if(color == 1) {
        circleColor = "stroke-green-500";
        offsetCircleColor = "stroke-green-100";
    } else if(color == 2) {
        circleColor = "stroke-red-500"
        offsetCircleColor = "stroke-red-100"
    } else if(color == 3) {
        circleColor = "stroke-orange-500"
        offsetCircleColor = "stroke-orange-100"
    }


  return (
    <div className="relative w-[44px] h-[44px] rounded-full">
      <svg className="w-full h-full transform rotate-[-90deg]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <circle className={`${offsetCircleColor} fill-transparent`} cx="18" cy="18" r="15.915" strokeWidth="2"></circle>
        <circle className={`${circleColor} fill-transparent`} cx="18" cy="18" r="15.915" strokeWidth="2" strokeDasharray="100" strokeDashoffset={strokeOffset}></circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm text-text-secondary">
        {Number.isFinite(rating) ? (
            <span className='flex items-center justify-center font-semibold text-lg'>{rating} <sup className='text-[6px]'>%</sup></span> 
          ) : (
            "NR"
          )
        }
      </div>
    </div>
  )
}
