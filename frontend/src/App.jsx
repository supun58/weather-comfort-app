import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginPage } from "./components/LoginPage"
import { WeatherDashboard } from "./components/WeatherDashboard"

function App() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")

  const handleLogin = (email, password) => {
    if (email === "careers@fidenz.com" && password === "Pass#fidenz") {
      setUser(email)
      setError("")
    } else {
      setError("Invalid credentials")
    }
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} error={error} />
  }

  return <WeatherDashboard onLogout={handleLogout} />
}

export default App



