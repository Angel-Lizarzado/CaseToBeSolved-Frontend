"use client";

import { useState } from 'react';
import ProjectList from '@/app/components/Projects';
import ProjectDetails from '@/app/components/ProjectDetails';
import ProjectForm from '@/app/components/ProjectForm';

export default function DashboardPage({ token }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <button 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancelar" : "Nuevo Proyecto"}
      </button>
      {showForm && <ProjectForm token={token} />}
      <ProjectList token={token} onSelectProject={setSelectedProject} />
      {selectedProject && <ProjectDetails project={selectedProject} />}
    </div>
  );
}
