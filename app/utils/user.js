"use server";

// Función para crear un nuevo usuario
export async function createUser(data) {
    const url = `${process.env.API_DOMAIN}/api/user/register`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al registrar usuario: ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw new Error('No se pudo registrar el usuario.');
    }
  }

// Función para validar un usuario con un código
// Función para validar un usuario con un código
export async function validateUser(data, token) {
  const url = `${process.env.API_DOMAIN}/api/user/validation`;

  try {
    const response = await fetch(url, {
      method: 'PUT', // Cambiado a PUT si la API requiere PUT para validación
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(text);
    } catch (error) {
      throw new Error(`Error al validar usuario: ${text}`);
    }

    if (!response.ok) {
      throw new Error(`Error al validar usuario: ${jsonResponse.message || text}`);
    }

    return jsonResponse;
  } catch (error) {
    console.error('Error al validar usuario:', error);
    throw new Error('No se pudo validar el usuario.');
  }
}

// Función para iniciar sesión de un usuario
export async function loginUser(data) {
    const url = `${process.env.API_DOMAIN}/api/user/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const text = await response.text();
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(text);
      } catch (error) {
        throw new Error(`Error al iniciar sesión: ${text}`);
      }
  
      if (!response.ok) {
        throw new Error(`Error al iniciar sesión: ${jsonResponse.message || text}`);
      }
  
      return jsonResponse;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('No se pudo iniciar sesión.');
    }
  }