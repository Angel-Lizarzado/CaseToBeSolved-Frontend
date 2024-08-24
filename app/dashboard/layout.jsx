'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Briefcase, FileText, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
    }
  }, [router])

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <nav className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            {isOpen && <h1 className="ml-2 text-xl font-bold">Gestor de Albaranes</h1>}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-indigo-700 transition-colors duration-200 self-end"
          >
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
          <ul className="flex-grow space-y-2 mt-8">
            <NavItem href="/dashboard" icon={<Users size={20} />} text="Clientes" isOpen={isOpen} />
            <NavItem href="/dashboard/projects" icon={<Briefcase size={20} />} text="Proyectos" isOpen={isOpen} />
            <NavItem href="/dashboard/delivery" icon={<FileText size={20} />} text="Albaranes" isOpen={isOpen} />
          </ul>
          <button
            onClick={logout}
            className="p-4 hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          >
            <LogOut size={20} />
            {isOpen && <span className="ml-2">Cerrar sesión</span>}
          </button>
        </div>
      </nav>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

function NavItem({ href, icon, text, isOpen }) {
  return (
    <li>
      <Link href={href} className="flex items-center p-4 hover:bg-indigo-700 transition-colors duration-200">
        {icon}
        {isOpen && <span className="ml-2">{text}</span>}
      </Link>
    </li>
  )
}
