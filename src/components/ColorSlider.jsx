import React from 'react'

function ColorSlider({textColor,setRange, range, label}) {
    return (
        <div className={`flex justify-between mb-2 ${textColor} text-xl`}>
            <input type="range" min={0} max={255} onChange={(e) => setRange(e.target.value)} value={range} />
            <label htmlFor="range">{label} : {range}</label>
        </div>
    )
}

export default ColorSlider
