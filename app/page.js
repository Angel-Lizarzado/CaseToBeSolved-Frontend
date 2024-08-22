"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde 'next/navigation'
import LoginCard from './components/LoginCard';
import RegisterCard from './components/RegisterCard';
import ValidateCard from './components/ValidateCard';
import { createUser, validateUser, loginUser } from './utils/user';

export default function Home() {
  const [currentView, setCurrentView] = useState('login');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico
  const router = useRouter(); // Usar el hook useRouter de 'next/navigation'

  const switchToRegister = () => setCurrentView('register');
  const switchToLogin = () => setCurrentView('login');
  const switchToValidate = () => setCurrentView('validate');

  const handleRegister = async (data) => {
    try {
      const response = await createUser(data);
      const token = response.token; // Asumiendo que la API devuelve un token
      setToken(token);
      setEmail(data.email); // Guardar el correo electrónico
      localStorage.setItem('token', token); // Guardar el token en localStorage
      console.log("Registro exitoso, cambiando a vista de validación");
      switchToValidate(); // Cambiar la vista a 'validate'
    } catch (error) {
      console.error(error);
    }
  };

  const handleValidate = async (code) => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token de localStorage
      await validateUser({ code }, token); // Enviar el código junto con el token
      router.push('/dashboard'); // Redirigir a /dashboard
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await loginUser(data);
      const token = response.token; // Asumiendo que la API devuelve un token
      setToken(token);
      localStorage.setItem('token', token); // Guardar el token en localStorage
      router.push('/dashboard'); // Redirigir a /dashboard
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      {currentView === 'login' && <LoginCard switchToRegister={switchToRegister} onLogin={handleLogin} />}
      {currentView === 'register' && <RegisterCard switchToLogin={switchToLogin} onRegister={handleRegister} />}
      {currentView === 'validate' && <ValidateCard onValidate={handleValidate} />}
    </main>
  );
}
