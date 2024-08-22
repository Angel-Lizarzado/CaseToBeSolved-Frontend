export default function ClientDetails({ client }) {
    return (
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-4">
        <h2 className="text-2xl font-bold mb-4">Detalles del Cliente</h2>
        <p><strong>Nombre:</strong> {client.name}</p>
        <p><strong>CIF:</strong> {client.cif}</p>
        <p><strong>Dirección:</strong> {client.address.street}, {client.address.number}, {client.address.postal}, {client.address.city}, {client.address.province}</p>
        <p><strong>Proyectos Activos:</strong> {client.activeProjects}</p>
        <p><strong>Notas Pendientes:</strong> {client.pendingDeliveryNotes}</p>
        <p><strong>Creado:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
        <p><strong>Actualizado:</strong> {new Date(client.updatedAt).toLocaleDateString()}</p>
      </div>
    );
  }
  