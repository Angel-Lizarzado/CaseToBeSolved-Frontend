'use client'

import { useState, useEffect } from 'react'
import Projects from '@/app/components/Projects'
import ProjectDetails from '@/app/components/ProjectDetails'
import ProjectForm from '@/app/components/ProjectForm'
import { listProjects } from '@/app/utils/projects'
import { PlusCircle, X } from 'lucide-react'

export default function ProjectPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [projects, setProjects] = useState([])

  const refreshProjects = async () => {
    const token = localStorage.getItem('token')
    try {
      const projects = await listProjects(token)
      setProjects(projects)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    refreshProjects()
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-800">Proyectos</h1>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={20} className="mr-2" /> : <PlusCircle size={20} className="mr-2" />}
          {showForm ? "Cancelar" : "Nuevo Proyecto"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <Projects projects={projects} onSelectProject={setSelectedProject} />
        </div>
        <div className="w-full md:w-1/3">
          {selectedProject && <ProjectDetails project={selectedProject} refreshProjects={refreshProjects} />}
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <ProjectForm refreshProjects={refreshProjects} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  )
}