import React from 'react'

export default function FormatSelector({ value, onChange, error }) {
  return (
    <div>
      <label htmlFor="format" className="block text-sm font-medium text-gray-700">Formato</label>
      <select 
        id="format"
        name="format" 
        value={value} 
        onChange={onChange} 
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${error ? 'border-red-500' : ''}`}
      >
        <option value="">Selecciona un formato</option>
        <option value="material">Material</option>
        <option value="hours">Horas</option>
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
