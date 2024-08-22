"use client";
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard">Clientes</Link>
          </li>
          <li>
            <Link href="/dashboard/projects">Proyectos</Link>
          </li>
          <li>
            <Link href="/dashboard/albaranes">Albaranes</Link>
          </li>
          <li className="mt-auto">
            <button className="text-white" onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8 bg-gray-100 flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}

function logout() {
  // Lógica para cerrar sesión
  console.log("Logout");
}
