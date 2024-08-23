"use client";

import { useState, useEffect } from 'react';
import { listDeliveryNotes, downloadDeliveryNotePDF, deleteDeliveryNote } from '@/app/utils/delivery';
import DeliveryForm from '@/app/components/DeliveryForm';

export default function DeliveryPage() {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const refreshDeliveryNotes = async () => {
    const token = localStorage.getItem('token');
    try {
      const notes = await listDeliveryNotes(token);
      setDeliveryNotes(notes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshDeliveryNotes();
  }, []);

  const handleDownloadPDF = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await downloadDeliveryNotePDF(token, id);
    } catch (error) {
      console.error('Error al descargar el PDF del albarán:', error);
      alert(`Error al descargar el PDF: ${error.message}`);
    }
  };
  

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteDeliveryNote(token, id);
      alert('Albarán eliminado con éxito');
      refreshDeliveryNotes();
    } catch (error) {
      console.error('Error al eliminar el albarán:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Albaranes</h1>
      <button 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancelar" : "Nuevo Albarán"}
      </button>
      {showForm && <DeliveryForm refreshDeliveryNotes={refreshDeliveryNotes} />}
      <ul className="w-full max-w-md bg-white p-4 rounded shadow mt-4">
  {deliveryNotes.map(note => (
    <li key={note._id} className="mb-4">
      <p><strong>Cliente:</strong> {note.clientId}</p>
      <p><strong>Proyecto:</strong> {note.projectId.name}</p>
      <p><strong>Formato:</strong> {note.format}</p>
      <p><strong>Material:</strong> {note.material}</p>
      <p><strong>Horas:</strong> {note.hours}</p>
      <p><strong>Descripción:</strong> {note.description}</p>
      <p><strong>Fecha de Trabajo:</strong> {note.workdate}</p>
      <button 
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded" 
        onClick={() => handleDownloadPDF(note._id)}
      >
        Descargar PDF
      </button>
      <button 
        className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded" 
        onClick={() => handleDelete(note._id)}
      >
        Eliminar
      </button>
    </li>
  ))}
</ul>

    </div>
  );
}
