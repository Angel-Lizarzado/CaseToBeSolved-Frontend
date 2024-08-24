'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginCard from './components/LoginCard'
import RegisterCard from './components/RegisterCard'
import ValidateCard from './components/ValidateCard'
import { createUser, validateUser, loginUser } from './utils/user'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [currentView, setCurrentView] = useState('login')
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const switchToRegister = () => {
    setCurrentView('register')
    setError('')
  }
  const switchToLogin = () => {
    setCurrentView('login')
    setError('')
  }
  const switchToValidate = () => setCurrentView('validate')

  const handleRegister = async (data) => {
    try {
      const response = await createUser(data)
      const token = response.token
      setToken(token)
      setEmail(data.email)
      localStorage.setItem('token', token)
      switchToValidate()
    } catch (error) {
      setError('Error en el registro. Por favor, inténtalo de nuevo.')
    }
  }

  const handleValidate = async (code) => {
    try {
      const token = localStorage.getItem('token')
      await validateUser({ code }, token)
      router.push('/dashboard')
    } catch (error) {
      setError('Error en la validación. Por favor, inténtalo de nuevo.')
    }
  }

  const handleLogin = async (data) => {
    try {
      const response = await loginUser(data)
      const token = response.token
      setToken(token)
      localStorage.setItem('token', token)
      router.push('/dashboard')
    } catch (error) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-100 to-indigo-100">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">Gestor de Albaranes</h1>
        <p className="text-lg text-gray-600">Simplifica tu gestión de albaranes con nuestra plataforma intuitiva</p>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      )}

      {currentView === 'login' && <LoginCard switchToRegister={switchToRegister} onLogin={handleLogin} />}
      {currentView === 'register' && <RegisterCard switchToLogin={switchToLogin} onRegister={handleRegister} />}
      {currentView === 'validate' && <ValidateCard onValidate={handleValidate} />}
    </main>
  )
}