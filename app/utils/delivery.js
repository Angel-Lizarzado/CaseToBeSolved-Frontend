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

export async function downloadDeliveryNotePDF(token, id) {
    const url = `${process.env.API_DOMAIN}/api/deliverynote/pdf/${id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
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
  