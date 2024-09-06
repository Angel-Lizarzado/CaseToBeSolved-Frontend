export default function ProjectSelector({ projects, value, onChange, error }) {
    return (
      <div>
        <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">Proyecto</label>
        <select 
          id="projectId"
          name="projectId" 
          value={value} 
          onChange={onChange} 
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${error ? 'border-red-500' : ''}`}
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map(project => (
            <option key={project._id} value={project._id}>{project.name}</option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }