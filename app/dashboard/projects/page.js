"use client";

import { useState, useEffect } from 'react';
import Projects from '@/app/components/Projects';
import ProjectDetails from '@/app/components/ProjectDetails';
import ProjectForm from '@/app/components/ProjectForm';
import { listProjects } from '@/app/utils/projects';

export default function ProjectPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);

  const refreshProjects = async () => {
    const token = localStorage.getItem('token');
    try {
      const projects = await listProjects(token);
      setProjects(projects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <Projects projects={projects} onSelectProject={setSelectedProject} />
      <button 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancelar" : "Nuevo Proyecto"}
      </button>
      {showForm && <ProjectForm refreshProjects={refreshProjects} />}
      {selectedProject && <ProjectDetails project={selectedProject} refreshProjects={refreshProjects} />}
    </div>
  );
}
