import React from 'react'

export default function ClientSelector({ clients, value, onChange, error }) {
  return (
    <div>
      <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Cliente</label>
      <select 
        id="clientId"
        name="clientId" 
        value={value} 
        onChange={onChange} 
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${error ? 'border-red-500' : ''}`}
      >
        <option value="">Selecciona un cliente</option>
        {clients.map(client => (
          <option key={client._id} value={client._id}>{client.name}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
