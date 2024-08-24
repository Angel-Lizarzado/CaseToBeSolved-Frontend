import { useState } from 'react'
import { downloadDeliveryNotePDF, deleteDeliveryNote } from '@/app/utils/delivery'
import { FileText, Download, Trash2 } from 'lucide-react'

export default function Delivery({ deliveryNotes, refreshDeliveryNotes }) {
  const [expandedNote, setExpandedNote] = useState(null)

  const handleDownloadPDF = async (id) => {
    const token = localStorage.getItem('token')
    try {
      await downloadDeliveryNotePDF(token, id)
    } catch (error) {
      console.error('Error al descargar el PDF del albarán:', error)
      alert(`Error al descargar el PDF: ${error.message}`)
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    try {
      await deleteDeliveryNote(token, id)
      alert('Albarán eliminado con éxito')
      refreshDeliveryNotes()
    } catch (error) {
      console.error('Error al eliminar el albarán:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">Lista de Albaranes</h2>
      {deliveryNotes.length === 0 ? (
        <p className="text-gray-500">No hay albaranes disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {deliveryNotes.map(note => (
            <li key={note._id} className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedNote(expandedNote === note._id ? null : note._id)}>
                <div className="flex items-center">
                  <FileText size={24} className="text-indigo-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-800">{note.projectId.name}</h3>
                    <p className="text-gray-600">Cliente: {note.clientId}</p>
                  </div>
                </div>
                <span className="text-indigo-600">{expandedNote === note._id ? '▲' : '▼'}</span>
              </div>
              {expandedNote === note._id && (
                <div className="mt-4 space-y-2">
                  <p><strong>Formato:</strong> {note.format}</p>
                  <p><strong>Material:</strong> {note.material || 'N/A'}</p>
                  <p><strong>Horas:</strong> {note.hours || 'N/A'}</p>
                  <p><strong>Descripción:</strong> {note.description}</p>
                  <p><strong>Fecha de Trabajo:</strong> {new Date(note.workdate).toLocaleDateString()}</p>
                  <div className="flex space-x-2 mt-4">
                    <button 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadPDF(note._id)
                      }}
                    >
                      <Download size={20} className="mr-2" />
                      Descargar PDF
                    </button>
                    <button 
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(note._id)
                      }}
                    >
                      <Trash2 size={20} className="mr-2" />
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}