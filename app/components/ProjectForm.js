import { useState, useEffect } from 'react';
import { createProject } from '../utils/projects';
import { listClients } from '../utils/clients';

export default function ProjectForm({ token }) {
  const [formData, setFormData] = useState({
    name: '',
    projectCode: '',
    email: '',
    address: {
      street: '',
      number: '',
      postal: '',
      city: '',
      province: ''
    },
    code: '',
    clientId: ''
  });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function loadClients() {
      try {
        const clients = await listClients(token);
        setClients(clients);
      } catch (error) {
        console.error(error);
      }
    }

    loadClients();
  }, [token]);

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
      await createProject(token, formData);
      alert('Proyecto creado con éxito');
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-2xl font-bold mb-4">Nuevo Proyecto</h2>
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
        <label className="block text-gray-700">Nombre</label>
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
          className="w-full p-2 border rounded mt-2"
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
          className="w-full p-2 border rounded mt-2"
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
          className="w-full p-2 border rounded mt-2"
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
          className="w-full p-2 border rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Código Interno</label>
        <input 
          type="text" 
          name="code" 
          value={formData.code} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Crear Proyecto</button>
    </form>
  );
}
