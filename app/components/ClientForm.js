import { useState } from 'react';
import { createClient } from '../utils/clients';
import { X } from 'lucide-react';

export default function ClientForm({ refreshClients, onClose }) {
  const [formData, setFormData] = useState({
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
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'El nombre es obligatorio';
    if (!formData.cif) errors.cif = 'El CIF es obligatorio';
    if (!formData.address.street) errors.street = 'La calle es obligatoria';
    if (!formData.address.number) errors.number = 'El número es obligatorio';
    if (!formData.address.postal) errors.postal = 'El código postal es obligatorio';
    if (!formData.address.city) errors.city = 'La ciudad es obligatoria';
    if (!formData.address.province) errors.province = 'La provincia es obligatoria';
    return errors;
  };

  const handleSubmit = async (e) => {
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
      await createClient(formData, token);
      setSuccessMessage('Cliente creado con éxito');
      refreshClients();
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error al crear nuevo cliente:', error);
      setErrors({ submit: 'Error al crear el cliente. Por favor, inténtalo de nuevo.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-800">Nuevo Cliente</h2>
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="cif" className="block text-sm font-medium text-gray-700">CIF</label>
        <input
          type="text"
          id="cif"
          name="cif"
          value={formData.cif}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.cif ? 'border-red-500' : ''}`}
        />
        {errors.cif && <p className="mt-1 text-sm text-red-500">{errors.cif}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">Calle</label>
        <input
          type="text"
          id="address.street"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.street ? 'border-red-500' : ''}`}
        />
        {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="address.number" className="block text-sm font-medium text-gray-700">Número</label>
        <input
          type="text"
          id="address.number"
          name="address.number"
          value={formData.address.number}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.number ? 'border-red-500' : ''}`}
        />
        {errors.number && <p className="mt-1 text-sm text-red-500">{errors.number}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="address.postal" className="block text-sm font-medium text-gray-700">Código Postal</label>
        <input
          type="text"
          id="address.postal"
          name="address.postal"
          value={formData.address.postal}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.postal ? 'border-red-500' : ''}`}
        />
        {errors.postal && <p className="mt-1 text-sm text-red-500">{errors.postal}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">Ciudad</label>
        <input
          type="text"
          id="address.city"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.city ? 'border-red-500' : ''}`}
        />
        {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="address.province" className="block text-sm font-medium text-gray-700">Provincia</label>
        <input
          type="text"
          id="address.province"
          name="address.province"
          value={formData.address.province}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.province ? 'border-red-500' : ''}`}
        />
        {errors.province && <p className="mt-1 text-sm text-red-500">{errors.province}</p>}
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition-colors">
        Crear Cliente
      </button>
    </form>
  );
}