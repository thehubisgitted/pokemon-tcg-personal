import { useState } from 'react'

import './App.css'

function App() {
  const logo_image_path = "https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-picture-11.png";

  return (
    <div className='flex flex-row items-center font-sans'>

      <div className='p-4 space-y-8 content-center items-center'>
        <img src={logo_image_path} alt="logo" className = "transform -scale-x-100 object-scale-down h-40 w-40"/>
        <h1 className='text-center text-2xl font-extrabold'> Pokemon Pulls</h1>
      </div>

    </div>
  )
}

export default App
