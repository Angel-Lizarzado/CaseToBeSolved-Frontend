"use client";

import { useState } from 'react';
import Clients from '../components/Clients';
import ClientDetails from '../components/ClientDetails';

export default function DashboardPage() {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Clients</h1>
      <Clients onSelectClient={setSelectedClient} />
      {selectedClient && <ClientDetails client={selectedClient} />}
    </div>
  );
}
