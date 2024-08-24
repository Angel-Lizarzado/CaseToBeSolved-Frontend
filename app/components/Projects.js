import { Briefcase } from 'lucide-react'

export default function Projects({ projects, onSelectProject }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">Lista de Proyectos</h2>
      {projects.length === 0 ? (
        <p className="text-gray-500">No hay proyectos disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li 
              key={project._id} 
              className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex items-center"
              onClick={() => onSelectProject(project)}
            >
              <Briefcase size={24} className="text-indigo-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-800">{project.name}</h3>
                <p className="text-gray-600">Código: {project.projectCode}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}