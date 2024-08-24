import { User, Briefcase, FileText, Calendar } from 'lucide-react'

export default function ClientDetails({ client }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">Detalles del Cliente</h2>
      <div className="space-y-4">
        <DetailItem icon={<User size={20} />} label="Nombre" value={client.name} />
        <DetailItem icon={<User size={20} />} label="CIF" value={client.cif} />
        <DetailItem
          icon={<User size={20} />}
          label="Dirección"
          value={`${client.address.street}, ${client.address.number}, ${client.address.postal}, ${client.address.city}, ${client.address.province}`}
        />
        <DetailItem icon={<Briefcase size={20} />} label="Proyectos Activos" value={client.activeProjects} />
        <DetailItem icon={<FileText size={20} />} label="Notas Pendientes" value={client.pendingDeliveryNotes} />
        <DetailItem icon={<Calendar size={20} />} label="Creado" value={new Date(client.createdAt).toLocaleDateString()} />
        <DetailItem icon={<Calendar size={20} />} label="Actualizado" value={new Date(client.updatedAt).toLocaleDateString()} />
      </div>
    </div>
  )
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center">
      <div className="mr-2 text-indigo-600">{icon}</div>
      <div>
        <span className="font-semibold">{label}:</span> {value}
      </div>
    </div>
  )
}