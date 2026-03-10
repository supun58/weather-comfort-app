import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  //test backend via /weather endpoint
  useEffect(()=> {
    fetch("http://localhost:5000/weather")
    .then(res => res.text())
    .then(data => console.log(data))
  })

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Tailwind Working
      </h1>
    </div>
  );
}

export default App
