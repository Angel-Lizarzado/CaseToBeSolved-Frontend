import { useState, useEffect } from 'react';
import { listClients, createClient } from '../utils/clients';

export default function Clients({ onSelectClient }) {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
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
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No autorizado');
        }
        const clientsList = await listClients(token);
        setClients(clientsList);
      } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
      }
    };

    fetchClients();
  }, []);

  const validate = () => {
    const errors = {};
    if (!newClient.name) errors.name = 'El nombre es obligatorio';
    if (!newClient.cif) errors.cif = 'El CIF es obligatorio';
    if (!newClient.address.street) errors.street = 'La calle es obligatoria';
    if (!newClient.address.number) errors.number = 'El número es obligatorio';
    if (!newClient.address.postal) errors.postal = 'El código postal es obligatorio';
    if (!newClient.address.city) errors.city = 'La ciudad es obligatoria';
    if (!newClient.address.province) errors.province = 'La provincia es obligatoria';
    return errors;
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No autorizado');
      }
      const createdClient = await createClient(newClient, token);
      setClients([...clients, createdClient]);
      setShowForm(false);
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
      });
    } catch (error) {
      console.error('Error al crear nuevo cliente:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {clients.length === 0 ? (
        <div>
          <p>No tienes clientes. ¿Desea registrar a su primer cliente?</p>
          <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white p-2 rounded">Crear Cliente</button>
        </div>
      ) : (
        <div>
          <ul className="grid grid-cols-1 gap-4 items-center justify-center aling-items">
            {clients.map((client) => (
              <li key={client._id} className="bg-white p-4 rounded shadow cursor-pointer" onClick={() => onSelectClient(client)}>
                <h2 className="text-xl font-bold">{client.name}</h2>
                <p className="text-gray-600">CIF: {client.cif}</p>
                <p><strong>Dirección:</strong> {client.address.street}, {client.address.number}, {client.address.postal}, {client.address.city}, {client.address.province}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowForm(true)} className="mt-4 bg-blue-500 text-white p-2 rounded">Crear Cliente</button>
        </div>
      )}
      {showForm && (
        <form onSubmit={handleCreateClient} className="mt-4 bg-white p-4 rounded shadow">
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CIF</label>
            <input
              type="text"
              value={newClient.cif}
              onChange={(e) => setNewClient({ ...newClient, cif: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.cif && <p className="text-red-500">{errors.cif}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Calle</label>
            <input
              type="text"
              value={newClient.address.street}
              onChange={(e) => setNewClient({ ...newClient, address: { ...newClient.address, street: e.target.value } })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.street && <p className="text-red-500">{errors.street}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Número</label>
            <input
              type="text"
              value={newClient.address.number}
              onChange={(e) => setNewClient({ ...newClient, address: { ...newClient.address, number: e.target.value } })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.number && <p className="text-red-500">{errors.number}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Código Postal</label>
            <input
              type="text"
              value={newClient.address.postal}
              onChange={(e) => setNewClient({ ...newClient, address: { ...newClient.address, postal: e.target.value } })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.postal && <p className="text-red-500">{errors.postal}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ciudad</label>
            <input
              type="text"
              value={newClient.address.city}
              onChange={(e) => setNewClient({ ...newClient, address: { ...newClient.address, city: e.target.value } })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.city && <p className="text-red-500">{errors.city}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Provincia</label>
            <input
              type="text"
              value={newClient.address.province}
              onChange={(e) => setNewClient({ ...newClient, address: { ...newClient.address, province: e.target.value } })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.province && <p className="text-red-500">{errors.province}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Crear</button>
          <button type="button" onClick={() => setShowForm(false)} className="w-full mt-2 bg-gray-500 text-white p-2 rounded">Cancelar</button>
        </form>
      )}
    </div>
  );
}
