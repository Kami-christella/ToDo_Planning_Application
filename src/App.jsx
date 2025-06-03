// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import './App.css'
import Homepage from './components/Homepage'

function App() {
  //const [count, setCount] = useState(0)

  return (
     <BrowserRouter>
        <Routes>
     <Route path='/' element={<Layout/>}>
    <Route index element={<Homepage />} />
     </Route>
        </Routes>
     </BrowserRouter>
  )
}

export default App
