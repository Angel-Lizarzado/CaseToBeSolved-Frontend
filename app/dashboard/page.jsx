'use client'

import { useState } from 'react'
import Clients from '../components/Clients'
import ClientDetails from '../components/ClientDetails'

export default function DashboardPage() {
  const [selectedClient, setSelectedClient] = useState(null)

  return (
    <div className="max-w-6xl mx-auto">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">Clientes</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <Clients onSelectClient={setSelectedClient} />
        </div>
        <div className="w-full md:w-1/3">
          {selectedClient && <ClientDetails client={selectedClient} />}
        </div>
      </div>
    </div>
  )
}