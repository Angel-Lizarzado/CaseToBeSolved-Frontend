import { useState } from 'react'
import ProjectForm from './ProjectForm'
import { Edit, X, User, Briefcase, MapPin, Calendar, FileText } from 'lucide-react'

export default function ProjectDetails({ project, refreshProjects }) {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-800">Detalles del Proyecto</h2>
        <button 
          className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          onClick={handleEditClick}
        >
          {isEditing ? <X size={24} /> : <Edit size={24} />}
        </button>
      </div>
      {isEditing ? (
        <ProjectForm project={project} refreshProjects={refreshProjects} onClose={() => setIsEditing(false)} />
      ) : (
        <div className="space-y-4">
          <DetailItem icon={<Briefcase size={20} />} label="Nombre" value={project.name} />
          <DetailItem icon={<FileText size={20} />} label="Código del Proyecto" value={project.projectCode} />
          <DetailItem icon={<MapPin size={20} />} label="Dirección" value={`${project.address.street}, ${project.address.number}, ${project.address.city}, ${project.address.province}, ${project.address.postal}`} />
          <DetailItem icon={<Calendar size={20} />} label="Fecha de Inicio" value={project.begin} />
          <DetailItem icon={<Calendar size={20} />} label="Fecha de Fin" value={project.end} />
          <DetailItem icon={<FileText size={20} />} label="Notas" value={project.notes} />
          <DetailItem icon={<Calendar size={20} />} label="Creado en" value={new Date(project.createdAt).toLocaleDateString()} />
          <DetailItem icon={<Calendar size={20} />} label="Actualizado en" value={new Date(project.updatedAt).toLocaleDateString()} />
        </div>
      )}
    </div>
  )
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center">
      <div className="mr-2 text-indigo-600">{icon}</div>
      <div>
        <span className="font-semibold">{label}:</span> {value}
      </div>
    </div>
  )
}