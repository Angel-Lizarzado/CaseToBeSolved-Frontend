'use client'

import { useState, useEffect } from 'react'
import { listClients } from '../utils/clients'
import { PlusCircle } from 'lucide-react'
import ClientForm from './ClientForm'

export default function Clients({ onSelectClient }) {
  const [clients, setClients] = useState([])
  const [showForm, setShowForm] = useState(false)

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No autorizado')
      }
      const clientsList = await listClients(token)
      setClients(clientsList)
    } catch (error) {
      console.error('Error al obtener la lista de clientes:', error)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleCreateClient = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {clients.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">No tienes clientes. ¿Desea registrar a su primer cliente?</p>
          <button onClick={handleCreateClient} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center mx-auto">
            <PlusCircle size={20} className="mr-2" />
            Crear Cliente
          </button>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {clients.map((client) => (
              <li key={client._id} className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => onSelectClient(client)}>
                <h2 className="text-xl font-bold text-indigo-800">{client.name}</h2>
                <p className="text-gray-600">CIF: {client.cif}</p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Dirección:</strong> {client.address.street}, {client.address.number}, {client.address.postal}, {client.address.city}, {client.address.province}
                </p>
              </li>
            ))}
          </ul>
          <button onClick={handleCreateClient} className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center">
            <PlusCircle size={20} className="mr-2" />
            Crear Cliente
          </button>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <ClientForm refreshClients={fetchClients} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  )
}