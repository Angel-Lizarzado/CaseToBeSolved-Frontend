'use client'

import { useState, useEffect } from 'react'
import { listDeliveryNotes } from '@/app/utils/delivery'
import Delivery from '@/app/components/Delivery'
import DeliveryForm from '@/app/components/DeliveryForm'
import { PlusCircle, X } from 'lucide-react'

export default function DeliveryPage() {
  const [deliveryNotes, setDeliveryNotes] = useState([])
  const [showForm, setShowForm] = useState(false)

  const refreshDeliveryNotes = async () => {
    const token = localStorage.getItem('token')
    try {
      const notes = await listDeliveryNotes(token)
      setDeliveryNotes(notes)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    refreshDeliveryNotes()
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-800">Albaranes</h1>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={20} className="mr-2" /> : <PlusCircle size={20} className="mr-2" />}
          {showForm ? "Cancelar" : "Nuevo Albarán"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          <Delivery deliveryNotes={deliveryNotes} refreshDeliveryNotes={refreshDeliveryNotes} />
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <DeliveryForm refreshDeliveryNotes={refreshDeliveryNotes} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  )
}