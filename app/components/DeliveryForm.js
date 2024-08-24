import { useState, useEffect } from 'react'
import { createDeliveryNote } from '../utils/delivery'
import { listClients } from '../utils/clients'
import { listProjects } from '../utils/projects'
import { X } from 'lucide-react'

export default function DeliveryForm({ refreshDeliveryNotes, onClose }) {
  const [formData, setFormData] = useState({
    clientId: '',
    projectId: '',
    format: '',
    material: '',
    hours: 0,
    description: '',
    workdate: ''
  })
  const [clients, setClients] = useState([])
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem('token')
      try {
        const clients = await listClients(token)
        const projects = await listProjects(token)
        setClients(clients)
        setProjects(projects)
      } catch (error) {
        console.error('Error al cargar los datos:', error)
      }
    }

    loadData()
  }, [])

  const handleClientChange = (e) => {
    const { value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      clientId: value,
      projectId: '' // Reset projectId when client changes
    }))
    const clientProjects = projects.filter(project => project.clientId === value)
    setFilteredProjects(clientProjects)
  }

  const handleFormatChange = (e) => {
    const { value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      format: value,
      material: '',
      hours: 0
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const validate = () => {
    const errors = {}
    if (!formData.clientId) errors.clientId = 'El cliente es obligatorio'
    if (!formData.projectId) errors.projectId = 'El proyecto es obligatorio'
    if (!formData.format) errors.format = 'El formato es obligatorio'
    if (formData.format === 'material' && !formData.material) errors.material = 'El material es obligatorio'
    if (formData.format === 'hours' && !formData.hours) errors.hours = 'Las horas son obligatorias'
    if (!formData.description) errors.description = 'La descripción es obligatoria'
    if (!formData.workdate) errors.workdate = 'La fecha de trabajo es obligatoria'
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    const token = localStorage.getItem('token')
    
    const dataToSend = { ...formData }
  
    if (formData.format === 'material') {
      dataToSend.hours = 0
    } else if (formData.format === 'hours') {
      dataToSend.material = ''
    }
  
    try {
      await createDeliveryNote(token, dataToSend)
      refreshDeliveryNotes()
      onClose()
    } catch (error) {
      console.error('Error al crear el albarán:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-800">Nuevo Albarán</h2>
        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <div>
        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Cliente</label>
        <select 
          id="clientId"
          name="clientId" 
          value={formData.clientId} 
          onChange={handleClientChange} 
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.clientId ? 'border-red-500' : ''}`}
        >
          <option value="">Selecciona un cliente</option>
          {clients.map(client => (
            <option key={client._id} value={client._id}>{client.name}</option>
          ))}
        </select>
        {errors.clientId && <p className="mt-1 text-sm text-red-500">{errors.clientId}</p>}
      </div>
      <div>
        <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">Proyecto</label>
        <select 
          id="projectId"
          name="projectId" 
          value={formData.projectId} 
          onChange={handleChange} 
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.projectId ? 'border-red-500' : ''}`}
        >
          <option value="">Selecciona un proyecto</option>
          {filteredProjects.map(project => (
            <option key={project._id} value={project._id}>{project.name}</option>
          ))}
        </select>
        {errors.projectId && <p className="mt-1 text-sm text-red-500">{errors.projectId}</p>}
      </div>
      <div>
        <label htmlFor="format" className="block text-sm font-medium text-gray-700">Formato</label>
        <select 
          id="format"
          name="format" 
          value={formData.format} 
          onChange={handleFormatChange} 
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.format ? 'border-red-500' : ''}`}
        >
          <option value="">Selecciona un formato</option>
          <option value="material">Material</option>
          <option value="hours">Horas</option>
        </select>
        {errors.format && <p className="mt-1 text-sm text-red-500">{errors.format}</p>}
      </div>
      {formData.format === 'material' && (
        <div>
          <label htmlFor="material" className="block text-sm font-medium text-gray-700">Tipo de Material</label>
          <input 
            id="material"
            type="text" 
            name="material" 
            value={formData.material} 
            onChange={handleChange} 
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.material ? 'border-red-500' : ''}`}
          />
          {errors.material && <p className="mt-1 text-sm text-red-500">{errors.material}</p>}
        </div>
      )}
      {formData.format === 'hours' && (
        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-gray-700">Horas</label>
          <input 
            id="hours"
            type="number" 
            name="hours" 
            value={formData.hours} 
            onChange={handleChange} 
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.hours ? 'border-red-500' : ''}`}
          />
          {errors.hours && <p className="mt-1 text-sm text-red-500">{errors.hours}</p>}
        </div>
      )}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea 
          id="description"
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="workdate" className="block text-sm font-medium text-gray-700">Fecha de Trabajo</label>
        <input 
          id="workdate"
          type="date" 
          name="workdate" 
          value={formData.workdate} 
          onChange={handleChange} 
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.workdate ? 'border-red-500' : ''}`}
        />
        {errors.workdate && <p className="mt-1 text-sm text-red-500">{errors.workdate}</p>}
      </div>
      <button 
        type="submit" 
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
      >
        Crear Albarán
      </button>
    </form>
  )
}