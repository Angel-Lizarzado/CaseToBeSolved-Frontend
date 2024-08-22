import { useState, useEffect } from 'react';
import { fetchProjects } from '../utils/projects'; 

export default function ProjectList({ token, onSelectProject }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const projects = await fetchProjects(token);
        setProjects(projects);
      } catch (error) {
        console.error(error);
      }
    }

    loadProjects();
  }, [token]);

  return (
    <ul className="grid grid-cols-1 gap-4">
      {projects.map((project) => (
        <li key={project._id} className="bg-white p-4 rounded shadow cursor-pointer" onClick={() => onSelectProject(project)}>
          <h2 className="text-xl font-bold">{project.name}</h2>
          <p>{project.projectCode}</p>
        </li>
      ))}
    </ul>
  );
}
