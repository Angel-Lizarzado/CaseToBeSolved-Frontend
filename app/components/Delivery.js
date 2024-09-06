import { useState } from 'react'
import { downloadDeliveryNotePDF, deleteDeliveryNote } from '@/app/utils/delivery'
import { FileText, Download, Trash2, ChevronRight } from 'lucide-react'

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
      setExpandedNote(null)
    } catch (error) {
      console.error('Error al eliminar el albarán:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">Lista de Albaranes</h2>
      {deliveryNotes.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay albaranes registrados.</p>
      ) : (
        <div className="flex">
          <ul className="space-y-2 w-1/2 pr-4 border-r border-gray-200">
            {deliveryNotes.map(note => (
              <li 
                key={note._id} 
                className={`bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${expandedNote === note._id ? 'bg-indigo-100 border-l-4 border-indigo-600' : ''}`}
                onClick={() => setExpandedNote(expandedNote === note._id ? null : note._id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText size={20} className="text-indigo-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-800">{note.projectId.name}</h3>
                      <p className="text-sm text-gray-600">Cliente: {note.clientId}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className={`text-indigo-600 transition-transform duration-200 ${expandedNote === note._id ? 'transform rotate-90' : ''}`} />
                </div>
              </li>
            ))}
          </ul>
          <div className="w-1/2 pl-4">
            {expandedNote && (
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">Detalles del Albarán</h3>
                <div className="space-y-2">
                  <p><strong>Formato:</strong> {deliveryNotes.find(note => note._id === expandedNote).format}</p>
                  {/* Al añadir para añadir multiples trabajadores o materiales, me registra N/A, comentado hasta resolver*/}
                  {/* <p><strong>Material:</strong> {deliveryNotes.find(note => note._id === expandedNote).material || 'N/A'}</p>
                  <p><strong>Horas:</strong> {deliveryNotes.find(note => note._id === expandedNote).hours || 'N/A'}</p> */}
                  <p><strong>Descripción:</strong> {deliveryNotes.find(note => note._id === expandedNote).description}</p>
                  <p><strong>Fecha de Trabajo:</strong> {new Date(deliveryNotes.find(note => note._id === expandedNote).workdate).toLocaleDateString()}</p>
                  <div className="flex space-x-2 mt-4">
                    <button 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadPDF(expandedNote)
                      }}
                    >
                      <Download size={20} className="mr-2" />
                      Descargar PDF
                    </button>
                    <button 
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(expandedNote)
                      }}
                    >
                      <Trash2 size={20} className="mr-2" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}