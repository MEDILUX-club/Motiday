import { useEffect, useState } from 'react'
import SplashScreen from './pages/auth/SplashScreen'
import LoginPage from './pages/auth/LoginPage'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLogin(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  return showLogin ? <LoginPage /> : <SplashScreen />
}

export default App
