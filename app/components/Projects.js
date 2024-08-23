export default function Projects({ projects, onSelectProject }) {
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
