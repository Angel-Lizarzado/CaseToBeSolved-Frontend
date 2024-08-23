// Función para listar proyectos
export async function listProjects(token) {
  const url = `${process.env.API_DOMAIN}/api/project`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error de red: ${response.statusText}`);
    }

    const projects = await response.json();
    console.log(projects);
    return projects;
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    throw new Error("No se pudieron obtener los proyectos.");
  }
}

// Función para crear un nuevo proyecto
export async function createProject(token, projectData) {
  const url = `${process.env.API_DOMAIN}/api/project`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Error de red: ${response.statusText}`);
    }

    const newProject = await response.json();
    console.log(newProject);
    return newProject;
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    throw new Error("No se pudo crear el proyecto.");
  }
}

// Función para actualizar un proyecto
export async function updateProject(token, projectId, projectData) {
  const url = `${process.env.API_DOMAIN}/api/project/${projectId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Error de red: ${response.statusText}`);
    }

    const updatedProject = await response.json();
    console.log(updatedProject);
    return updatedProject;
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    throw new Error("No se pudo actualizar el proyecto.");
  }
}

