"use server";

// Función para listar clientes
export async function listClients(token) {
  if (typeof window === 'undefined') {
    return []; // Devuelve una lista vacía si se llama en el servidor
  }
  const url = `${process.env.API_DOMAIN}/api/clients`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener la lista de clientes: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener la lista de clientes:', error);
    throw new Error('No se pudo obtener la lista de clientes.');
  }
}

// Función para crear un nuevo cliente
export async function createClient(data, token) {
    console.log("la info en user.js: ", data);
    console.log("token: ", token);
    try {
      const url = `${process.env.API_DOMAIN}/api/client`;
      console.log("URL: ", url);
      console.log("Cuerpo de la solicitud:", JSON.stringify(data));
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      console.log("Estado de la respuesta:", response.status);
      const text = await response.text();
      console.log("Texto de la respuesta:", text);
  
      if (!response.ok) {
        throw new Error(
          "La respuesta de la red no fue correcta: " + response.statusText
        );
      }
  
      const dataRes = JSON.parse(text);
      console.log(dataRes);
      return dataRes;
    } catch (error) {
      console.error("Failed to create new client:", error);
      throw new Error("Failed to create new client.");
    }
  }
  
  

// Función para obtener información de un cliente por ID
export async function getClientById(id, token) {
  console.log("Obteniendo información del cliente con ID:", id);
  try {
    const url = `${process.env.API_DOMAIN}/api/client/${id}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la red: ${response.statusText}`);
    }

    const dataRes = await response.json();
    return dataRes;
  } catch (error) {
    console.error("Error al obtener información del cliente:", error);
    throw new Error("No se pudo obtener la información del cliente.");
  }
}
