import { useState } from 'react'

import './App.css'
import LoveMeter from './component/LoveMeter'
import Header from './component/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div >
        <Header />

        <LoveMeter />
      </div>

    </>
  )
}

export default App
