import { useState, useEffect } from 'react';
import { createDeliveryNote } from '../utils/delivery';
import { listClients } from '../utils/clients';
import { listProjects } from '../utils/projects';

export default function DeliveryForm({ refreshDeliveryNotes }) {
  const [formData, setFormData] = useState({
    clientId: '',
    projectId: '',
    format: '',
    material: '',
    hours: 0,
    description: '',
    workdate: ''
  });
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem('token');
      try {
        const clients = await listClients(token);
        const projects = await listProjects(token);
        setClients(clients);
        setProjects(projects);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    }

    loadData();
  }, []);

  const handleClientChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      clientId: value,
      projectId: '' // Reset projectId when client changes
    }));
    const clientProjects = projects.filter(project => project.clientId === value);
    setFilteredProjects(clientProjects);
  };

  const handleFormatChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      format: value,
      material: '',
      hours: 0
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Crear una copia del formData para modificar
    const dataToSend = { ...formData };
  
    // Ajustar los campos según el formato seleccionado
    if (formData.format === 'material') {
      dataToSend.hours = 0; // O puedes usar '' si prefieres
    } else if (formData.format === 'hours') {
      dataToSend.material = '';
    }
  
    // Asegurarse de que todos los campos requeridos están presentes
    const requiredFields = ['clientId', 'projectId', 'format', 'description', 'workdate'];
    for (const field of requiredFields) {
      if (!dataToSend[field]) {
        console.error(`El campo ${field} es requerido`);
        return;
      }
    }
  
    try {
      await createDeliveryNote(token, dataToSend);
      alert('Albarán creado con éxito');
      refreshDeliveryNotes();
    } catch (error) {
      console.error('Error al crear el albarán:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-2xl font-bold mb-4">Nuevo Albarán</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Cliente</label>
        <select 
          name="clientId" 
          value={formData.clientId} 
          onChange={handleClientChange} 
          className="w-full p-2 border rounded"
        >
          <option value="">Selecciona un cliente</option>
          {clients.map(client => (
            <option key={client._id} value={client._id}>{client.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Proyecto</label>
        <select 
          name="projectId" 
          value={formData.projectId} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        >
          <option value="">Selecciona un proyecto</option>
          {filteredProjects.map(project => (
            <option key={project._id} value={project._id}>{project.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Formato</label>
        <select 
          name="format" 
          value={formData.format} 
          onChange={handleFormatChange} 
          className="w-full p-2 border rounded"
        >
          <option value="">Selecciona un formato</option>
          <option value="material">Material</option>
          <option value="hours">Horas</option>
        </select>
      </div>
      {formData.format === 'material' && (
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Material</label>
          <input 
            type="text" 
            name="material" 
            value={formData.material} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      {formData.format === 'hours' && (
        <div className="mb-4">
          <label className="block text-gray-700">Horas</label>
          <input 
            type="number" 
            name="hours" 
            value={formData.hours} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700">Descripción</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Fecha de Trabajo</label>
        <input 
          type="date" 
          name="workdate" 
          value={formData.workdate} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear Albarán</button>
    </form>
  );
}
