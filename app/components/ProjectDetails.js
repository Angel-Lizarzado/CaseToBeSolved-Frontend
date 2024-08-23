import { useState } from 'react';
import ProjectForm from './ProjectForm';

export default function ProjectDetails({ project, refreshProjects }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded shadow mt-4">
      <h2 className="text-2xl font-bold mb-4">Detalles del Proyecto</h2>
      <p><strong>Nombre:</strong> {project.name}</p>
      <p><strong>Código del Proyecto:</strong> {project.projectCode}</p>
      <p><strong>Dirección:</strong> {project.address.street}, {project.address.number}, {project.address.city}, {project.address.province}, {project.address.postal}</p>
      <p><strong>Fecha de Inicio:</strong> {project.begin}</p>
      <p><strong>Fecha de Fin:</strong> {project.end}</p>
      <p><strong>Notas:</strong> {project.notes}</p>
      <p><strong>Creado en:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
      <p><strong>Actualizado en:</strong> {new Date(project.updatedAt).toLocaleDateString()}</p>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
        onClick={handleEditClick}
      >
        {isEditing ? "Cancelar" : "Editar Proyecto"}
      </button>
      {isEditing && <ProjectForm project={project} refreshProjects={refreshProjects} />}
    </div>
  );
}
