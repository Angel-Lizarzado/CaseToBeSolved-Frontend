export async function listDeliveryNotes(token) {
  const url = `${process.env.API_DOMAIN}/api/deliverynote`;
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

    const deliveryNotes = await response.json();
    return deliveryNotes;
  } catch (error) {
    console.error("Error al listar los albaranes:", error);
    throw new Error("No se pudo listar los albaranes.");
  }
}

export async function getDeliveryNoteById(token, id) {
  const url = `${process.env.API_DOMAIN}/api/deliverynote/${id}`;
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

    const deliveryNote = await response.json();
    return deliveryNote;
  } catch (error) {
    console.error("Error al obtener el albarán:", error);
    throw new Error("No se pudo obtener el albarán.");
  }
}

// Funcion para crear un albaran
export async function createDeliveryNote(token, deliveryNoteData) {
  const url = `${process.env.API_DOMAIN}/api/deliverynote`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(deliveryNoteData),
    });

    if (!response.ok) {
      throw new Error(`Error de red: ${response.statusText}`);
    }

    const newDeliveryNote = await response.json();
    return newDeliveryNote;
  } catch (error) {
    console.error("Error al crear el albarán:", error);
    throw new Error("No se pudo crear el albarán.");
  }
}

export async function updateDeliveryNoteMaterials(token, id, materials) {
  const url = `${process.env.API_DOMAIN}/api/deliverynote/multimaterial/${id}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(materials), // Asegúrate de que materials sea un objeto con un array
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error de red: ${response.statusText} - ${errorText}`);
    }

    const updatedDeliveryNote = await response.json();
    return updatedDeliveryNote;
  } catch (error) {
    console.error("Error al actualizar los materiales del albarán:", error);
    throw new Error("No se pudo actualizar los materiales del albarán.");
  }
}


//Funcion para editar un albaran

export async function updateDeliveryNoteMulti(token, id, multi) {
  const url = `${process.env.API_DOMAIN}/api/deliverynote/multi/${id}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ multi }),
    });

    if (!response.ok) {
      throw new Error(`Error de red: ${response.statusText}`);
    }

    const updatedDeliveryNote = await response.json();
    return updatedDeliveryNote;
  } catch (error) {
    console.error("Error al actualizar las horas del albarán:", error);
    throw new Error("No se pudo actualizar las horas del albarán.");
  }
}


//Funcion para descargar un albaran

export async function downloadDeliveryNotePDF(token, id) {
    const url = `${process.env.API_DOMAIN}/api/deliverynote/pdf/${id}`;
    console.log("url")
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      if (!response.ok) {
        console.log(response)
        throw new Error(`Error de red: ${response.statusText}`);
      }
  
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      window.open(urlBlob, '_blank');
    } catch (error) {
      console.error("Error al abrir el PDF del albarán:", error);
      throw new Error("No se pudo abrir el PDF del albarán.");
    }
  }

// Función para eliminar un albarán
export async function deleteDeliveryNote(token, id) {
    const url = `${process.env.API_DOMAIN}/api/deliverynote/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error de red: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error al eliminar el albarán:", error);
      throw new Error("No se pudo eliminar el albarán.");
    }
  }
  
