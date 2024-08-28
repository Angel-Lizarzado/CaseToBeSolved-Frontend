import { useState, useEffect } from 'react';
import { createDeliveryNote, updateDeliveryNoteMaterials, updateDeliveryNoteMulti } from '../utils/delivery';
import { listClients } from '../utils/clients';
import { listProjects } from '../utils/projects';
import { X, Plus, Minus } from 'lucide-react';
import ClientSelector from './ClientSelector';
import ProjectSelector from './ProjectSelector';
import FormatSelector from './FormatSelector';

export default function DeliveryForm({ refreshDeliveryNotes, onClose }) {
  const [formData, setFormData] = useState({
    clientId: '',
    projectId: '',
    format: '',
    material: '',
    hours: 0,
    description: '',
    workdate: '',
    materials: [{ name: '', quantity: '', unit: 'Kg' }],
    multi: [{ name: '', hours: '', description: '' }]
  });
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [errors, setErrors] = useState({});

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
      projectId: ''
    }));
    const clientProjects = projects.filter(project => project.clientId === value);
    setFilteredProjects(clientProjects);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: newArray
    }));
  };

  const addArrayItem = (arrayName) => {
    const newItem = arrayName === 'materials' 
      ? { name: '', quantity: '', unit: 'Kg' }
      : { name: '', hours: '', description: '' };
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: [...prevData[arrayName], newItem]
    }));
  };

  const removeArrayItem = (index, arrayName) => {
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: prevData[arrayName].filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.clientId) errors.clientId = 'El cliente es obligatorio';
    if (!formData.projectId) errors.projectId = 'El proyecto es obligatorio';
    if (!formData.format) errors.format = 'El formato es obligatorio';
    if (formData.format === 'material' && !formData.material) errors.material = 'El material es obligatorio';
    if (formData.format === 'hours' && !formData.hours) errors.hours = 'Las horas son obligatorias';
    if (!formData.description) errors.description = 'La descripción es obligatoria';
    if (!formData.workdate) errors.workdate = 'La fecha de trabajo es obligatoria';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const token = localStorage.getItem('token');
  
    const workdate = new Date(formData.workdate);
    const formattedDate = `${workdate.getMonth() + 1}/${workdate.getDate()}/${workdate.getFullYear()}`;
  
    const dataToSend = {
      clientId: formData.clientId,
      projectId: formData.projectId,
      format: formData.format,
      material: formData.format === 'material' ? formData.material : null,
      hours: formData.format === 'hours' ? formData.hours : null,
      description: formData.description,
      workdate: formattedDate
    };
  
    try {
      const newDeliveryNote = await createDeliveryNote(token, dataToSend);
  
      if (formData.format === 'material') {
        const materialsData = { materials: formData.materials };
        await updateDeliveryNoteMaterials(token, newDeliveryNote._id, materialsData);
      } else if (formData.format === 'hours') {
        await updateDeliveryNoteMulti(token, newDeliveryNote._id, formData.multi);
      }
  
      refreshDeliveryNotes();
      onClose();
    } catch (error) {
      console.error('Error al crear el albarán:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-800">Nuevo Albarán</h2>
        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <ClientSelector 
        clients={clients} 
        value={formData.clientId} 
        onChange={handleClientChange} 
        error={errors.clientId} 
      />
      <ProjectSelector 
        projects={filteredProjects} 
        value={formData.projectId} 
        onChange={handleChange} 
        error={errors.projectId} 
      />
      <FormatSelector 
        value={formData.format} 
        onChange={handleChange} 
        error={errors.format} 
      />
      {formData.format === 'material' && (
        <div className="space-y-4">
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
          {formData.materials.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-medium text-gray-700">Material {index + 1}</h4>
                <button type="button" onClick={() => removeArrayItem(index, 'materials')} className="text-red-500 hover:text-red-700">
                  <Minus size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Material</label>
                  <input 
                    type="text" 
                    value={item.name} 
                    onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'materials')} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleArrayChange(index, 'quantity', e.target.value, 'materials')} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unidad</label>
                  <select 
                    value={item.unit} 
                    onChange={(e) => handleArrayChange(index, 'unit', e.target.value, 'materials')} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="Kg">Kg</option>
                    <option value="Lts">Lts</option>
                    <option value="Units">Units</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addArrayItem('materials')} 
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Agregar Material
          </button>
        </div>
      )}
      {formData.format === 'hours' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700">Horas Totales</label>
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
          {formData.multi.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-medium text-gray-700">Trabajador {index + 1}</h4>
                <button type="button" onClick={() => removeArrayItem(index, 'multi')} className="text-red-500 hover:text-red-700">
                  <Minus size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Trabajador</label>
                  <input 
                    type="text" 
                    value={item.name} 
                    onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'multi')} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Horas</label>
                  <input 
                    type="number" 
                    value={item.hours} 
                    onChange={(e) => handleArrayChange(index, 'hours', e.target.value, 'multi')} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <input 
                    type="text" 
                    value={item.description} 
                    onChange={(e) => handleArrayChange(index, 'description', e.target.value, 'multi')} 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addArrayItem('multi')} 
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Agregar Trabajador
          </button>
        </div>
      )}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea 
          id="description"
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          rows="4"
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
  );
}