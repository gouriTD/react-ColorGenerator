import React, { useCallback, useRef, useState } from 'react'
import ColorSlider from './components/ColorSlider'

const DEFAULT_OPACITY = 0.4

function App() {
  const [redRange,setRedRange] = useState(0)
  const [greenRange,setGreenRange] = useState(0)
  const [blueRange,setBlueRange] = useState(0)
  const [isOpacityAllowed,setIsOpacityAllowed] = useState(false)
  const [opacity,setOpacity] = useState(0)

  const colorRef = useRef(null)

  /** Generates a new color from the given rgb and opacity value. */
  const generateColor = useCallback(()=>{
    return isOpacityAllowed? `rgba(${redRange},${greenRange},${blueRange},${opacity/100})` : `rgb(${redRange},${greenRange},${blueRange})`
  },[redRange,greenRange,blueRange,isOpacityAllowed,opacity])

  /** Copies the selection to the clipboard. */
  const copyColor = ()=>{
    window.navigator.clipboard.writeText(colorRef.current.value)
    colorRef.current.select()
  }

  return (
    <div className={`w-full h-screen flex justify-center p-4`} style={{backgroundColor:generateColor()}}>
      {/* <h1 className=' text-3xl text-orange-300'>Hello</h1> */}
      <div className=' w-[90%] sm:w-[70%] md:w-[50%] h-min p-4  rounded-lg shadow-xl bg-slate-100'>
        <h2 className=' text-2xl text-purple-800 text-center font-bold'> Color Generator </h2>

        <div className=' flex w-full mb-6 mt-3'>
          <div className={' w-[10%] h-[50px] border-2'} style={{backgroundColor: generateColor()}}></div>
          <input ref={colorRef} type="text" name="" id="" value={isOpacityAllowed ? `rgba(${redRange},${greenRange},${blueRange},${opacity/100})`:`rgb(${redRange},${greenRange},${blueRange})`} readOnly className=' w-[70%] h-[50px] outline-none pl-4'/>
          <button className=' w-[20%] h-[50px] bg-indigo-900 text-white' onClick={copyColor}>copy</button>
        </div>

        {/* range for setting red color value */}
        <ColorSlider textColor='text-orange-700' setRange={setRedRange} range={redRange} label='red'/>

        {/* range for setting green color value */}
        <ColorSlider textColor='text-green-700' setRange={setGreenRange} range={greenRange} label='green'/>

        {/* range for setting blue color value */}
         <ColorSlider textColor='text-blue-700' setRange={setBlueRange} range={blueRange} label='blue'/>

        <div className='flex justify-between mb-2 text-xl text-gray-600'>
          <input type="checkbox" name="" id="" defaultChecked={isOpacityAllowed} onChange={()=>setIsOpacityAllowed(prev=>!prev)}/>
          {isOpacityAllowed &&  <input type="range" min={0} max={100} onChange={(e)=>setOpacity(e.target.value)} value={opacity}/>
          }
          <label htmlFor="checkbox">opacity allowed</label>
        </div>
       
      </div>
    </div>
  )
}

export default App
