'use client'

import { useState, useEffect } from 'react'
import { listClients, createClient } from '../utils/clients'
import { PlusCircle, X } from 'lucide-react'

export default function Clients({ onSelectClient }) {
  const [clients, setClients] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newClient, setNewClient] = useState({
    name: '',
    cif: '',
    address: {
      street: '',
      number: '',
      postal: '',
      city: '',
      province: ''
    }
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
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

    fetchClients()
  }, [])

  const validate = () => {
    const errors = {}
    if (!newClient.name) errors.name = 'El nombre es obligatorio'
    if (!newClient.cif) errors.cif = 'El CIF es obligatorio'
    if (!newClient.address.street) errors.street = 'La calle es obligatoria'
    if (!newClient.address.number) errors.number = 'El número es obligatorio'
    if (!newClient.address.postal) errors.postal = 'El código postal es obligatorio'
    if (!newClient.address.city) errors.city = 'La ciudad es obligatoria'
    if (!newClient.address.province) errors.province = 'La provincia es obligatoria'
    return errors
  }

  const handleCreateClient = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No autorizado')
      }
      const createdClient = await createClient(newClient, token)
      setClients([...clients, createdClient])
      setShowForm(false)
      setNewClient({
        name: '',
        cif: '',
        address: {
          street: '',
          number: '',
          postal: '',
          city: '',
          province: ''
        }
      })
    } catch (error) {
      console.error('Error al crear nuevo cliente:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {clients.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">No tienes clientes. ¿Desea registrar a su primer cliente?</p>
          <button onClick={() => setShowForm(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center mx-auto">
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
          <button onClick={() => setShowForm(true)} className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center">
            <PlusCircle size={20} className="mr-2" />
            Crear Cliente
          </button>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateClient} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-indigo-800">Nuevo Cliente</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <Input
                label="Nombre"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                error={errors.name}
              />
              <Input
                label="CIF"
                value={newClient.cif}
                onChange={(e) => setNewClient({ ...newClient, cif: e.target.value })}
                error={errors.cif}
              />
              <Input
                label="Calle"
                value={newClient.address.street}
                onChange={(e) => setNewClient({ ...newClient, address: { ...newClient.address, street: e.target.value } })}
                error={errors.street}
              />
              <Input
                label="Número"
                value={newClient.address.number}
                onChange={(e) => setNewClient({ ...newClient, address: { ...newClient.address, number: e.target.value } })}
                error={errors.number}
              />
              <Input
                label="Código Postal"
                value={newClient.address.postal}
                onChange={(e) => setNewClient({ ...newClient, address: { ...newClient.address, postal: e.target.value } })}
                error={errors.postal}
              />
              <Input
                label="Ciudad"
                value={newClient.address.city}
                onChange={(e) => setNewClient({ ...newClient, address: { ...newClient.address, city: e.target.value } })}
                error={errors.city}
              />
              <Input
                label="Provincia"
                value={newClient.address.province}
                onChange={(e) => setNewClient({ ...newClient, address: { ...newClient.address, province: e.target.value } })}
                error={errors.province}
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200">
                Crear
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function Input({ label, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}