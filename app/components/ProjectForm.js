import { useState, useEffect } from 'react';
import { createProject, updateProject } from '../utils/projects';
import { listClients } from '../utils/clients';
import { X } from 'lucide-react';

export default function ProjectForm({ project, refreshProjects, onClose }) {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    projectCode: project?.projectCode || '',
    email: project?.email || '',
    address: {
      street: project?.address?.street || '',
      number: project?.address?.number || '',
      postal: project?.address?.postal || '',
      city: project?.address?.city || '',
      province: project?.address?.province || ''
    },
    code: project?.code || '',
    clientId: project?.clientId || ''
  });
  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function loadClients() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No autorizado');
        }
        const clients = await listClients(token);
        setClients(clients);
      } catch (error) {
        console.error('Error al cargar los clientes:', error);
      }
    }

    loadClients();
  }, []);

  const handleClientChange = (e) => {
    const selectedClient = clients.find(client => client._id === e.target.value);
    if (selectedClient) {
      setFormData({
        ...formData,
        clientId: selectedClient._id,
        address: selectedClient.address,
        email: selectedClient.email || '',
      });
    }
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
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No autorizado');
      }
      if (project) {
        await updateProject(token, project._id, formData);
        setSuccessMessage('Proyecto actualizado con éxito');
      } else {
        await createProject(token, formData);
        setSuccessMessage('Proyecto creado con éxito');
      }
      refreshProjects();
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error al crear/actualizar el proyecto:', error);
      setErrors({ submit: 'Error al crear/actualizar el proyecto. Por favor, inténtalo de nuevo.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-800">{project ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      {errors.submit && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {errors.submit}
        </div>
      )}
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
        <label className="block text-gray-700">Nombre del proyecto</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Código del Proyecto</label>
        <input 
          type="text" 
          name="projectCode" 
          value={formData.projectCode} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Dirección</label>
        <input 
          type="text" 
          name="street" 
          value={formData.address.street} 
          onChange={(e) => setFormData((prevData) => ({
            ...prevData,
            address: {
              ...prevData.address,
              street: e.target.value
            }
          }))}
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          name="number" 
          value={formData.address.number} 
          onChange={(e) => setFormData((prevData) => ({
            ...prevData,
            address: {
              ...prevData.address,
              number: e.target.value
            }
          }))}
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          name="postal" 
          value={formData.address.postal} 
          onChange={(e) => setFormData((prevData) => ({
            ...prevData,
            address: {
              ...prevData.address,
              postal: e.target.value
            }
          }))}
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          name="city" 
          value={formData.address.city} 
          onChange={(e) => setFormData((prevData) => ({
            ...prevData,
            address: {
              ...prevData.address,
              city: e.target.value
            }
          }))}
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          name="province" 
          value={formData.address.province} 
          onChange={(e) => setFormData((prevData) => ({
            ...prevData,
            address: {
              ...prevData.address,
              province: e.target.value
            }
          }))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Código</label>
        <input 
          type="text" 
          name="code" 
          value={formData.code} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition-colors">
        {project ? 'Actualizar Proyecto' : 'Crear Proyecto'}
      </button>
    </form>
  );
}